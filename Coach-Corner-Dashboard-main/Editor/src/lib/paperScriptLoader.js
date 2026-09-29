import paper from 'paper';

export function loadPaperScript(canvasId, scriptContent) {
  let scope = null;
  const canvas = document.getElementById(canvasId);
  console.log("Canvas",canvas)
  if (canvas) {
    // Execute PaperScript content
    scope = new paper.PaperScope();
    scope.setup(canvas);
    // scope.install(window);
    try {
      scope.execute(scriptContent);
    } catch (error) {
      console.error('Error executing PaperScript:', error);
    }
  }
  return scope;
}