export function updateInitialState(emptyState: object[], path: string) {
  const initialStateInJSON = localStorage?.getItem(path)

  if (initialStateInJSON === null) {
    return emptyState
  }

  const initialState = JSON.parse(initialStateInJSON)

  return initialState
}
