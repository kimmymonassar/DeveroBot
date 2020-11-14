import { config } from 'dotenv';
import path from 'path';

if (process.env.production) {
  config({ path: path.resolve(process.cwd(), '.env') });
} else {
  config({ path: path.resolve(process.cwd(), '.env.development') });
}
