export function extractCurrentPath(component): string {
  return component.props.location.pathname;
}