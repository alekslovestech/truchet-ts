declare module "yargs" {
  interface Argv {
    option(key: string, opts: Record<string, unknown>): Argv;
    parseSync(): { word?: string; style: string; inverted: boolean; init_tile_flipped: boolean; svg: boolean };
  }
  function yargs(args: string[]): Argv;
  export default yargs;
}

declare module "yargs/helpers" {
  export function hideBin(argv: string[]): string[];
}
