import { readFileSync } from 'fs';
import { resolve } from 'path';
import { EnvVariableValue, RenderContext } from './types/RenderContext';
import { TemplateTag } from './types/TemplateTag';
import { TemplateTagContext } from './types/TemplateTagContext';

const customGeneratedValueTemplateTag: TemplateTag = {
  name: 'customGeneratedValue',
  displayName: 'Custom Generated Value',
  description:
    'Generate a value using javascript code stored in an environment variable or a file referenced by it.',
  args: [
    {
      defaultValue: '',
      description:
        'The environment variable containing Javascript code valid in a function which returns the result as a string or the name of .js file',
      displayName: 'Env variable with fn js code or path to a .js file',
      placeholder: '',
      type: 'string',
    },
  ],
  async run(templateTagContext: TemplateTagContext, envVarName: string) {
    const { app, context } = templateTagContext;
    if (!envVarName) {
      return `Error: Please use the name of an environment variable!`;
    }

    if (!(envVarName in context)) {
      return `Error: Environment variable "${envVarName}" does not exists!`;
    }

    try {
      const code = context[envVarName];
      if (code === undefined) {
        return '';
      }

      const packCode = getCode(code);
      if (packCode === undefined) {
        throw new Error(
          'Invalid type. Expected string or an array of strings.'
        );
      }

      const insomniaEnv = getInsomniaEnv(context);
      return exec(packCode, insomniaEnv);
    } catch (e) {
      return `Error: Environment variable "${envVarName}" does not contains valid Javascript code!\nReason: ${e.message}`;
    }
  },
};

function getCode(code: string | Array<string>): string | undefined {
  if (typeof code === 'string') {
    return readCodeFromFile(code);
  }

  if (Array.isArray(code)) {
    return code.map((line) => line?.toString?.()).join('\n');
  }
}

function readCodeFromFile(code: string): string {
  const fsPath = resolve(__dirname, code);
  try {
    const data = readFileSync(fsPath, 'utf8');
    return data;
  } catch (err) {
    throw new Error(`Cannot read the code from "${fsPath}"!`);
  }
}

let cacheInsomniaEnv: Record<string, EnvVariableValue>;
let prevContext: RenderContext;

function getInsomniaEnv(
  context: RenderContext
): Record<string, EnvVariableValue> {
  if (prevContext === context && cacheInsomniaEnv) {
    return cacheInsomniaEnv;
  }

  prevContext = context;
  cacheInsomniaEnv = {};
  for (const [key, value] of Object.entries(context)) {
    if (key !== '_' && typeof value !== 'function') {
      cacheInsomniaEnv[key] = value;
    }
  }
  return cacheInsomniaEnv;
}

function exec(code: string, env: Record<string, EnvVariableValue>): string {
  const prepEnv = JSON.stringify(env);
  const execCode = `(function(){const $$=JSON.parse(\`${prepEnv}\`);${code};})()`;
  return eval(execCode) ?? '';
}

module.exports.templateTags = [customGeneratedValueTemplateTag];
