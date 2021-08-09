import styled from "styled-components"

export const NormalText = styled.div`
  font-family: "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Droid Sans",
    "Helvetica", sans-serif;

  @media screen and (max-width: 768px) {
  }
`

export const Label = styled.div`
  font-family: "Anakotmai", "Ubuntu", "Droid Sans", "Helvetica", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 500)};
`

export const Button = styled.button`
  font-family: "Anakotmai", "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
    "Droid Sans", "Helvetica", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 400)};
`

export const H4 = styled.h4`
  font-family: "Anakotmai", "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
    "Droid Sans", "Helvetica", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 400)};
`
