import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}

import "./scripts/skills";
import "./scripts/slider";
import "./scripts/parallax";
import "./scripts/parallax-reviews";
import "./scripts/popup";
import "./scripts/slider-works";
import "./scripts/form";