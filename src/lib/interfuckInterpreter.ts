// Interpreter for the HyperCall Programming Language (HCPL)

// Function to convert number to character
export function convertToChar(value: number): string {
  switch (value) {
    // Lowercase letters
    case 1: return ' ';
    case 2: return 'a';
    case 3: return 'b';
    case 4: return 'c';
    case 5: return 'd';
    case 6: return 'e';
    case 7: return 'f';
    case 8: return 'g';
    case 9: return 'h';
    case 10: return 'i';
    case 11: return 'j';
    case 12: return 'k';
    case 13: return 'l';
    case 14: return 'm';
    case 15: return 'n';
    case 16: return 'o';
    case 17: return 'p';
    case 18: return 'q';
    case 19: return 'r';
    case 20: return 's';
    case 21: return 't';
    case 22: return 'u';
    case 23: return 'v';
    case 24: return 'w';
    case 25: return 'x';
    case 26: return 'y';
    case 27: return 'z';
    
    // Uppercase letters
    case 28: return 'A';
    case 29: return 'B';
    case 30: return 'C';
    case 31: return 'D';
    case 32: return 'E';
    case 33: return 'F';
    case 34: return 'G';
    case 35: return 'H';
    case 36: return 'I';
    case 37: return 'J';
    case 38: return 'K';
    case 39: return 'L';
    case 40: return 'M';
    case 41: return 'N';
    case 42: return 'O';
    case 43: return 'P';
    case 44: return 'Q';
    case 45: return 'R';
    case 46: return 'S';
    case 47: return 'T';
    case 48: return 'U';
    case 49: return 'V';
    case 50: return 'W';
    case 51: return 'X';
    case 52: return 'Y';
    case 53: return 'Z';
    
    // Numbers
    case 54: return '0';
    case 55: return '1';
    case 56: return '2';
    case 57: return '3';
    case 58: return '4';
    case 59: return '5';
    case 60: return '6';
    case 61: return '7';
    case 62: return '8';
    case 63: return '9';
    case 64: return '10';
    
    // Special characters
    case 65: return '.';
    case 66: return ',';
    case 67: return '?';
    case 68: return '!';
    case 69: return '(';
    case 70: return ')';
    case 71: return '"';
    case 72: return '-';
    case 73: return '+';
    case 74: return '*';
    
    default: return value.toString();
  }
}

// Reprezentacja Databer - główny kontener danych
export class Databer {
  private datalings: number[] = [];

  // Dodaje nowy Dataling z podaną wartością
  addDataling(value: number): number {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error("Stupid error: Dataling value must be numeric");
    }
    this.datalings.push(value);
    return this.datalings.length - 1; // Return the index of the newly added dataling
  }

  // Usuwa Dataling o określonym indeksie
  removeDataling(index: number): void {
    if (index >= 0 && index < this.datalings.length) {
      this.datalings.splice(index, 1);
    } else {
      throw new Error(`Stupid error: Cannot remove Dataling at index ${index}, out of range`);
    }
  }

  // Aktualizuje wartość Dataling o określonym indeksie
  updateDataling(index: number, value: number): void {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error("Stupid error: Dataling value must be numeric");
    }
    
    if (index >= 0 && index < this.datalings.length) {
      this.datalings[index] = value;
    } else {
      throw new Error(`Stupid error: Cannot update Dataling at index ${index}, out of range`);
    }
  }

  // Zwraca wszystkie wartości Datalings jako string
  getValues(): string {
    if (this.datalings.length === 0) {
      return "";
    }
    
    // Updated to handle all character ranges (1-74)
    return this.datalings.map(value => {
      if (value >= 1 && value <= 74) {  // Changed from 27 to 74 to include all character ranges
        return convertToChar(value);
      }
      return value.toString();
    }).join("");
  }

  // Usuwa wszystkie Datalings
  clear(): void {
    this.datalings = [];
  }

  // Zwraca kopię wszystkich Datalings
  getAllDatalings(): number[] {
    return [...this.datalings];
  }
}

// Typu wejścia dla interpretera
export interface InterfuckInput {
  code: string;
  hideCommandOutput?: boolean; // Add option to hide command output
}

// Rezultat wykonania kodu
export interface InterfuckResult {
  output: string[];
  error?: string;
}

// Helper function to validate command syntax
function validateCommandSyntax(line: string): string | null {
  // Check for missing period (.)
  if (line.startsWith('PLEASE') && !line.includes('.')) {
    return "AMNESIA ERROR - Missing Orb (.) in command.";
  }
  
  // Check for missing colon (:)
  if (line.startsWith('PLEASE') && line.includes('.') && !line.includes(':')) {
    return "AMNESIA ERROR - Missing Semi-Orb (:) in command.";
  }
  
  // Check for too many periods
  const periodCount = (line.match(/\./g) || []).length;
  if (periodCount > 1) {
    return "ORB OVERLOAD ERROR - Too many Orbs (.) in command.";
  }
  
  // Check for valid command structure but unknown command
  if (line.startsWith('PLEASE') && line.includes(':') && line.includes('.')) {
    const commandMatch = line.match(/PLEASE\s+([A-Z]+)\s+:/);
    if (commandMatch) {
      const command = commandMatch[1];
      if (!['DO', 'DONT', 'LET', 'CALL', 'BREACH', 'EXIT'].includes(command)) {
        return "SYNTAX ERROR - Unknown command despite correct syntax.";
      }
    }
  }
  
  return null;
}

// Główna funkcja interpretująca kod HyperCall Programming Language
export function interpretInterfuck(input: InterfuckInput): InterfuckResult {
  const { code, hideCommandOutput = false } = input;
  const databer = new Databer();
  const output: string[] = [];
  let error: string | undefined;

  try {
    // Check if the code contains EXIT command
    if (!code.includes('PLEASE EXIT :6.')) {
      throw new Error("Stupid error: Missing PLEASE EXIT :6. command at the end of the program");
    }

    // Dzielimy kod na linie
    const lines = code.split('\n').map(line => line.trim());

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      
      // Obsługa komentarzy - usuwamy wszystko po // z linii kodu
      if (line.includes('//')) {
        line = line.split('//')[0].trim();
        if (!line) continue; // Jeśli linia zawierała tylko komentarz, przechodzimy dalej
      }
      
      // Pomiń puste linie po usunięciu komentarzy
      if (!line) continue;
      
      // Validate command syntax
      const syntaxError = validateCommandSyntax(line);
      if (syntaxError) {
        throw new Error(syntaxError);
      }
      
      // PLEASE DO :1. - Tworzy Dataling
      if (line.startsWith('PLEASE DO :1.')) {
        // Szukamy wartości w następnej linii
        if (i + 1 < lines.length) {
          let nextLine = lines[i + 1].trim();
          
          // Usuwamy komentarze z linii wartości
          if (nextLine.includes('//')) {
            nextLine = nextLine.split('//')[0].trim();
          }
          
          if (nextLine && /^-?\d+$/.test(nextLine)) {
            const value = Number(nextLine);
            if (!isNaN(value)) {
              const index = databer.addDataling(value);
              if (!hideCommandOutput) {
                output.push(`Created Dataling with value: ${value} at index ${index}`);
              }
              i++; // Przesuwamy wskaźnik, aby pominąć linię wartości
            } else {
              throw new Error(`Stupid error: Value "${nextLine}" is not numeric`);
            }
          } else {
            throw new Error(`Stupid error: Expected numeric value in the next line after PLEASE DO :1.`);
          }
        } else {
          throw new Error("Stupid error: Missing value after PLEASE DO :1.");
        }
      }
      // PLEASE DONT :2. - Usuwa Dataling
      else if (line.startsWith('PLEASE DONT :2.')) {
        const indexMatch = line.match(/:2\.\s*(\d+)/);
        if (indexMatch && indexMatch[1]) {
          const index = Number(indexMatch[1]);
          databer.removeDataling(index);
          if (!hideCommandOutput) {
            output.push(`Removed Dataling at index: ${index}`);
          }
        } else {
          throw new Error("Stupid error: PLEASE DONT :2. requires an index");
        }
      }
      // PLEASE LET :3. - Edytuje wartość Dataling
      else if (line.startsWith('PLEASE LET :3.')) {
        const match = line.match(/PLEASE LET :3\.\s*(\d+)/);
        if (match && match[1]) {
          const index = Number(match[1]);
          
          // Szukamy wartości w następnej linii
          if (i + 1 < lines.length) {
            let nextLine = lines[i + 1].trim();
            
            // Usuwamy komentarze z linii wartości
            if (nextLine.includes('//')) {
              nextLine = nextLine.split('//')[0].trim();
            }
            
            if (nextLine && /^-?\d+$/.test(nextLine)) {
              const value = Number(nextLine);
              if (!isNaN(value)) {
                databer.updateDataling(index, value);
                if (!hideCommandOutput) {
                  output.push(`Updated Dataling at index ${index} with value: ${value}`);
                }
                i++; // Przesuwamy wskaźnik, aby pominąć linię wartości
              } else {
                throw new Error(`Stupid error: Value "${nextLine}" is not numeric`);
              }
            } else {
              throw new Error(`Stupid error: Expected numeric value in the next line after PLEASE LET :3.`);
            }
          } else {
            throw new Error("Stupid error: Missing value after PLEASE LET :3.");
          }
        } else {
          throw new Error("Stupid error: PLEASE LET :3. requires an index");
        }
      }
      // PLEASE CALL :4. - Wyświetla wartości Databer
      else if (line.startsWith('PLEASE CALL :4.')) {
        const values = databer.getValues();
        // Only show the raw values without the "Databer values:" prefix
        output.push(`${values || 'empty'}`);
      }
      // PLEASE BREACH :5. - Usuwa wszystkie Datalings
      else if (line.startsWith('PLEASE BREACH :5.')) {
        databer.clear();
        if (!hideCommandOutput) {
          output.push("All Datalings removed from Databer");
        }
      }
      // PLEASE EXIT :6. - Wychodzi z interpretera
      else if (line.startsWith('PLEASE EXIT :6.')) {
        output.push("Exiting INTERFUCK IDE");
        break;
      }
      // Nieznana komenda
      else if (line && !line.startsWith('#')) { // Ignorujemy również linie rozpoczynające się od #
        throw new Error(`Unrecognized action: ${line}`);
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      error = e.message;
    } else {
      error = 'Unknown error occurred';
    }
  }

  return { output, error };
}
