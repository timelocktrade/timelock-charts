import {config as envConfig} from 'dotenv';
envConfig();

// eslint-disable-next-line n/no-unpublished-import
import type {CodegenConfig} from '@graphql-codegen/cli';
const {config: serviceConfig} = await import('./src/config');

const config: CodegenConfig = {
  overwrite: true,
  schema: `${serviceConfig.ponderEndpoint}/graphql`,
  documents: 'src/graphql/**/*.graphql',
  generates: {
    'src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
      config: {
        useIndexSignature: true,
        enumsAsTypes: true,
        skipTypename: false,
        exportFragmentSpreadSubTypes: true,
        dedupeFragments: true,
        inlineFragmentTypes: 'combine',
        nonOptionalTypename: true,
        preResolveTypes: true,
        namingConvention: {
          typeNames: 'pascal-case#pascalCase',
          enumValues: 'upper-case#upperCase',
        },
      },
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
};

export default config;
