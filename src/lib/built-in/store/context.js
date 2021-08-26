import * as React from 'react'

const StoreContext = React.createContext({})
const StoreContextSetter = React.createContext(() => {
  return
})

/**
 * @typedef {{
 *  children: React.ReactNode
 *  value: object
 * }} StoreProviderProps
 */

function StoreProvider(/** @type {StoreProviderProps} */ { children, value }) {
  const [state, setState] = React.useState(value)

  const handleSetState = () => (/** @type {object} */ newState) => {
    if (isObject(newState)) return setState(oldState => ({ ...oldState, ...newState }))

    setState(newState)
  }

  return (
    <StoreContext.Provider value={state}>
      <StoreContextSetter.Provider value={handleSetState}>{children}</StoreContextSetter.Provider>
    </StoreContext.Provider>
  )
}

function useStoreValue() {
  return React.useContext(StoreContext)
}

function useStoreSetter() {
  return React.useContext(StoreContextSetter)
}

function useStore() {
  return [useStoreValue(), useStoreSetter()]
}

/**
 * @param {object} value
 */
function isObject(value) {
  return typeof value === 'object' && value !== null
}

export { StoreProvider, useStoreValue, useStoreSetter }
export default useStore
