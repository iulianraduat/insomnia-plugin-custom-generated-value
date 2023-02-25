# How to use it

Add the custom TemplateTag called "Custom Generated Value" to your request. Use Crtl+Space to insert it.

Configure the "Custom Generated Value" to get its value from the code saved in an environment variable or a .js file having its path in the environment variable.

If the value of the environment variable is a **string** then it is assumed to be the path to **a .js file**.
The path is relative to this plugin's folder.
Conform [here](https://docs.insomnia.rest/insomnia/introduction-to-plugins) the path will be:

- MacOS: `~/Library/Application Support/Insomnia/plugins/insomnia-plugin-custom-generated-value`
- Windows: `%APPDATA%\Insomnia\plugins\insomnia-plugin-custom-generated-value`
- Linux: `$XDG_CONFIG_HOME/Insomnia/plugins/insomnia-plugin-custom-generated-value` or `~/.config/Insomnia/plugins/insomnia-plugin-custom-generated-value`

If the value of the environment variable is an **array**, then it is asusmed to contain lines of **Javascript code**.

The environment value must contain valid Javascript code which can be executed inside of a function.
The value returned is the value used by Insomnia instead of this TemplateTag.

The code can be stored in the variable as a string or a one-dimensional array of strings, in which case they are concatenated as lines of code.

It is recommended that all environment variables used with this plugin to have a name preffixed with _js_.

```json
{
  "_js_id": "~/insomnia/generators/generate-custom-value.js"
}
```

As JSON does not accept multi-lines you can split your code in lines for a better readability.

```json
{
  "_js_id": ["return Math.random() * 100"],
  "_js_id2": ["const max = 100;", "return Math.random() * max;"]
}
```

Inside of the code you have access via object $$ to all defined environment variable accesible to the request.

```json
{
  "guid": "12345",
  "_js_id": [
    "const guid = $$.guid;",
    "return `${guid}-${guid}-${guid}-${guid}-${guid}`"
  ]
}
```

## Known Issues

None.

## Change Log

See Change Log [here](CHANGELOG.md)

## Issues

Submit an [issue](https://github.com/iulian-radu-at/insomnia-plugin-custom-generated-value/issues) if you find any bug or have any request.

## Contribution

Fork the [repo](https://github.com/iulian-radu-at/insomnia-plugin-custom-generated-value) and submit pull requests.
