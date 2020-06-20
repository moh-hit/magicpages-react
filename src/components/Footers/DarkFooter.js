/*eslint-disable*/
import React from "react";

import { Container } from "reactstrap";

function DarkFooter() {
  return (
    <footer className="footer md-12 " data-background-color="blue">
      <Container>
        <nav>
          <ul>
            <li>
              <a
                href="#"
                target="_blank"
              >
                Propstory
              </a>
            </li>

          </ul>
        </nav>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, Designed by{" "}
          <a href="#">
            Propstory Pvt. Ltd.
          </a>
          .
        </div>
      </Container>
    </footer>
  );
}

export default DarkFooter;
