import React, { CSSProperties, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const AnimationEnabledThresholdInMillis = 20;
const images = ["1.png", "2.png", "3.png"];

const AnimationStyles: CSSProperties = {
  transitionProperty: "opacity",
  transitionDuration: "0.1s",
  transitionTimingFunction: "ease-in",
  transitionDelay: "0s"
};

// to use currently unsupported attribute 'loading'
declare module "react" {
  interface HTMLAttributes<T> {
    loading?: any;
  }
}

const makeImgStyles = (
  loaded: boolean,
  needAnimation: boolean
): CSSProperties => {
  let styles: CSSProperties = {
    opacity: loaded ? 1 : 0
  };

  if (needAnimation) {
    styles = {
      ...styles,
      ...AnimationStyles
    };
  }

  return styles;
};

const Image = (props: { url: string }) => {
  const [initiallyRenderedAt, setInitiallyRenderedAt] = useState();
  const [loaded, setLoaded] = useState(false);
  const [needAnimation, setNeedAnimation] = useState(false);

  useEffect(() => {
    setInitiallyRenderedAt(Date.now());
  }, []);

  const handleLoad = () => {
    setLoaded(true);
    if (Date.now() - initiallyRenderedAt > AnimationEnabledThresholdInMillis) {
      setNeedAnimation(true);
    }
  };

  return (
    <div className="Image">
      <img
        src={props.url}
        alt=""
        loading="lazy"
        style={makeImgStyles(loaded, needAnimation)}
        onLoad={handleLoad}
      />
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      {images.map(x => {
        return <Image url={x} />;
      })}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
