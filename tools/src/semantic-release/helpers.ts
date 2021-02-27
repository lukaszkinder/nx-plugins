import { log, ProcessArgs, spawnProcess } from '../utils/spawn-process';
import { SemanticContext } from './types';

export async function runAffectedBuild(context: SemanticContext) {
  await spawnProcess(
    'nx',
    [
      'affected',
      getCommonArgs(context),
      ['--target', 'build'],
      '--prod',
      ['--buildableProjectDepsInPackageJsonType', 'dependencies'],
    ],
    { cwd: context.cwd }
  )
    .pipe(log(context.logger))
    .toPromise();
}

export async function runAffectedVersion(context: SemanticContext) {
  await spawnProcess(
    'nx',
    [
      'affected',
      getCommonArgs(context),
      ['--target', 'version'],
      ['--pkgVersion', context.nextRelease.version],
    ],
    { cwd: context.cwd }
  )
    .pipe(log(context.logger))
    .toPromise();
}

export async function runAffectedPublish(context: SemanticContext) {
  await spawnProcess(
    'nx',
    ['affected', getCommonArgs(context), ['--target', 'publish']],
    { cwd: context.cwd }
  )
    .pipe(log(context.logger))
    .toPromise();
}

function getCommonArgs(context: SemanticContext): ProcessArgs {
  return [
    '--parallel',
    ['--base', context.lastRelease.gitHead],
    ['--head', context.nextRelease.gitHead],
    '--with-deps',
  ];
}