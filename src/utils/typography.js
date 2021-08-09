import styled from "styled-components"

export const NormalText = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 200;

  @media screen and (max-width: 768px) {
  }
`

export const Label = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Anakotmai", "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 500)};
`

export const Button = styled.button`
  font-family: -apple-system, BlinkMacSystemFont, "Anakotmai", "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 200)};
`

export const H4 = styled.h4`
  font-family: -apple-system, BlinkMacSystemFont, "Anakotmai", "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 400)};
`
