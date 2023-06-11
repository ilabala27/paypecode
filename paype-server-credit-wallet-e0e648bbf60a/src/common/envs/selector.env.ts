import { existsSync } from 'fs';
import { resolve } from 'path';

export function envSelector(dest: string): string {
  const env_default : string = resolve(`${dest}/.local.env`);
  const env_system: string = resolve(`${dest}/.${process.env.NODE_ENV}.env`);
  return existsSync(env_system)? env_system : env_default
}