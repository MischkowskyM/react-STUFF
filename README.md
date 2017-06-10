# react-stuff

## React **ST**ateful **U**tilities **F**or **F**orms.

A simple wrapper for dealing with form values in react, without heavy reliance on the redux store. Individual fields are free to sync to store on their behalf (by calling props.updateParent) and are otherwise normal, stateful react components.

This is not meant to be used as a library, but as scaffholding for your own implementation. Adding or changing new form components should be easy, though not quite as trivial as with higher order components.