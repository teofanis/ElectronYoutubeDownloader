// eslint-disable-next-line func-names
module.exports = function (plop) {
  plop.setGenerator('basics', {
    description: 'Create a new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the component?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/renderer/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'stubs/component.hbs',
      },
      {
        type: 'add',
        path: 'src/renderer/components/{{pascalCase name}}/index.ts',
        template:
          "// eslint-disable-next-line import/prefer-default-export\nexport { default as {{pascalCase name}} } from './{{pascalCase name}}';\n",
      },
      {
        type: 'add',
        path: 'src/renderer/components/{{pascalCase name}}/__tests__/{{pascalCase name}}.test.tsx',
        templateFile: 'stubs/component-test.hbs',
      },
      {
        type: 'modify',
        path: 'src/renderer/components/index.ts',
        pattern: /(\/\/ Automatic import of components)/g,
        template:
          "import { {{pascalCase name}} } from 'renderer/components/{{pascalCase name}}';\n$1",
      },
      {
        type: 'modify',
        path: 'src/renderer/components/index.ts',
        pattern: /(\/\/ Automatic export of components)/g,
        template: '{{pascalCase name}},\n  $1',
      },
    ],
  });
};
