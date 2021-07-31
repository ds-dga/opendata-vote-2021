import BottomFloater from "./BottomFloater";

export default function CookieToS() {
  return (
    <BottomFloater
      child={
        <>
          <span id="cupcakeconsent:desc" className="bottom-float-message">
            Just so you know, this website uses cookies.{" "}
            <a
              aria-label="learn more about cookies"
              role="button"
              tabindex="0"
              className="bottom-float-link"
              href="https://cookiesandyou.com"
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              What are cookies?
            </a>
          </span>
          <div className="bottom-float-compliance">
            <a
              aria-label="dismiss cookie message"
              role="button"
              tabindex="0"
              className="bottom-float-btn bottom-float-dismiss"
            >
              <span>👍</span> Got it!
            </a>
          </div>
        </>
      }
    />
  );
}
