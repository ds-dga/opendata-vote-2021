import * as React from "react"

function FacebookIcon(props) {
  // icon:social-facebook-circular | Typicons https://www.s-ings.com/typicons/ | Stephen Hutchings
  // https://reactsvgicons.com/search?q=facebook
  return (
    <svg
      baseProfile="tiny"
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M18.354 5.624C16.604 3.883 14.466 3 12 3c-2.489 0-4.633.884-6.373 2.625C3.884 7.366 3 9.512 3 12c0 2.465.883 4.603 2.624 6.354C7.365 20.11 9.51 21 12 21c2.467 0 4.605-.89 6.356-2.643C20.111 16.604 21 14.465 21 12c0-2.488-.89-4.634-2.646-6.376zm-1.412 11.319c-1.137 1.139-2.436 1.788-3.942 1.985V14h2v-2h-2v-1.4a.6.6 0 01.601-.6H15V8h-1.397c-.742 0-1.361.273-1.857.822-.496.547-.746 1.215-.746 2.008V12H9v2h2v4.93c-1.522-.195-2.826-.845-3.957-1.984C5.668 15.562 5 13.944 5 12c0-1.966.667-3.588 2.042-4.96C8.412 5.667 10.034 5 12 5c1.945 0 3.562.668 4.945 2.043C18.328 8.415 19 10.037 19 12c0 1.941-.673 3.559-2.058 4.943z" />
    </svg>
  )
}

export default FacebookIcon
