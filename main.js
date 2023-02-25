var __async = (__this, __arguments, generator) => {
  return new Promise((resolve2, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve2(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/main.ts
var import_fs = require("fs");
var import_path = require("path");
var customGeneratedValueTemplateTag = {
  name: "customGeneratedValue",
  displayName: "Custom Generated Value",
  description: "Generate a value using javascript code stored in an environment variable or a file referenced by it.",
  args: [
    {
      defaultValue: "",
      description: "The environment variable containing Javascript code valid in a function which returns the result as a string or the name of .js file",
      displayName: "Env variable with fn js code or path to a .js file",
      placeholder: "",
      type: "string"
    }
  ],
  run(templateTagContext, envVarName) {
    return __async(this, null, function* () {
      const { app, context } = templateTagContext;
      if (!envVarName) {
        return `Error: Please use the name of an environment variable!`;
      }
      if (!(envVarName in context)) {
        return `Error: Environment variable "${envVarName}" does not exists!`;
      }
      try {
        const code2 = context[envVarName];
        if (code2 === void 0) {
          return "";
        }
        const packCode = getCode(code2);
        if (packCode === void 0) {
          throw new Error(
            "Invalid type. Expected string or an array of strings."
          );
        }
        const insomniaEnv = getInsomniaEnv(context);
        return exec(packCode, insomniaEnv);
      } catch (e) {
        return `Error: Environment variable "${envVarName}" does not contains valid Javascript code!
Reason: ${e.message}`;
      }
    });
  }
};
function getCode(code2) {
  if (typeof code2 === "string") {
    return readCodeFromFile(code2);
  }
  if (Array.isArray(code2)) {
    return code2.map((line) => {
      var _a;
      return (_a = line == null ? void 0 : line.toString) == null ? void 0 : _a.call(line);
    }).join("\n");
  }
}
function readCodeFromFile(code2) {
  const fsPath = (0, import_path.resolve)(__dirname, code2);
  try {
    const data = (0, import_fs.readFileSync)(fsPath, "utf8");
    return data;
  } catch (err) {
    throw new Error(`Cannot read the code from "${fsPath}"!`);
  }
}
var cacheInsomniaEnv;
var prevContext;
function getInsomniaEnv(context) {
  if (prevContext === context && cacheInsomniaEnv) {
    return cacheInsomniaEnv;
  }
  prevContext = context;
  cacheInsomniaEnv = {};
  for (const [key, value] of Object.entries(context)) {
    if (key !== "_" && typeof value !== "function") {
      cacheInsomniaEnv[key] = value;
    }
  }
  return cacheInsomniaEnv;
}
function exec(code, env) {
  var _a;
  const prepEnv = JSON.stringify(env);
  const execCode = `(function(){const $$=JSON.parse(\`${prepEnv}\`);${code};})()`;
  return (_a = eval(execCode)) != null ? _a : "";
}
module.exports.templateTags = [customGeneratedValueTemplateTag];
