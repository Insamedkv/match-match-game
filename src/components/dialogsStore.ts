export async function dialogs() {
  return Promise.all([
    import('./registerDialogComponent/registerDialog').then((module) => module.RegisterDialogComponent),
    import('./congratsComponent/congrats').then((module) => module.CongratsDialogComponent),
  ]);
}
