import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import LaptopIcon from "@material-ui/icons/Laptop";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import Grid from "@material-ui/core/Grid";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { DataBaseMiddleware } from "../../store/middlewares/index.js";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import LinkIcon from '@material-ui/icons/Link';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import google from '../../assets/img/google.png'
import facebook from '../../assets/img/facebook.png'
import taboola from '../../assets/img/taboola.png';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const axios = require("axios");


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


class PageDetail extends Component {
  constructor(props) {
    super(props);

    // DIFFERENT STATE VARIABLES
    this.state = {
      data: [],
      selectedFile: null,
      code: null,
      encoded: null,
      pageId: null,
      name_input: "",
      file: "",
      imagePreviewUrl: "",
      frameWidth: "100%",
      btnClassM: "disabled",
      btnClassD: "secondary",
      //   Form Data
      meta_keyword: "",
      meta_description: "",
      page_title: "",
      meta_author: "",
      favicon_icon: "",
      google_pageview_pixel: "",
      facebook_pageview_pixel: "",
      other_pageview_pixel: "",
      google_conversion_pixel: "",
      facebook_conversion_pixel: "",
      other_conversion_pixel: "",
      utmId: "",
      pageName: "",
      pageLinks: [],
      // Form Data Ends
      clicked: "",
      imgClass: "",
      margTop: 0,
      isSaved: false,
      anchorEl: null,
      urlToCopy: "",
      loadingLink: false
      //   code: this.state.data.html
    };
    this.onClickMobile = this.onClickMobile.bind(this);
    this.onClickDesktop = this.onClickDesktop.bind(this);
    // this.handleFileRead = this.handleFileRead.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSave = this.onSave.bind(this);
    this.enableEditableImages = this.enableEditableImages.bind(this);
    this._handleImageChange = this._handleImageChange.bind(this);
    this.fetchPage = this.fetchPage.bind(this);
  }




  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClosePopover = () => {
    this.setState({ anchorEl: null });
  };

  enableEditableImages = () => {
    console.log("IN ENABLE EDITABLE");
    // this.addEditImageModal();
    // this.addEditImageModalEvents();
    // this.addImageChangeBtn();
    let that = this;
    let iframe = document.getElementById("frame");
    //var allImages = window.frames['frame'].contentDocument.getElementByTagName('img')[0];
    //console.log($('#frame').contents().find('img'))
    let allImages = $("#frame").contents().find("img");
    console.log("ALL IMAGES" + allImages);
    $.each(allImages, function (index, img) {
      $(img).hover(
        function () {
          $(this).append($(".middle-btn-container"));
          $(".middle-btn-container").css({
            opacity: "1",
          });
          $(img).css({
            opacity: ".7",
          });
          $(".change-img-btn").data("img", $(img));
        },
        function () {
          $(".middle-btn-container").css({
            opacity: "0",
          });
          $(img).css({
            opacity: "1",
          });
        }
      );

      var source = $(this);

      $(img).click(function () {
        console.log(source);
        that.setState({
          imagePreviewUrl: source.attr("src"),
          clicked: source.attr("src"),
        });
        if (
          document
            .getElementById("frame")
            .contentWindow.document.body.getElementsByClassName("img101")
            .length > 0
        ) {
          document
            .getElementById("frame")
            .contentWindow.document.body.querySelector(".img101")
            .classList.remove("img101");
          source.addClass("img101");
        } else {
          source.addClass("img101");
        }
      });

      $(".change-img-btn").on("click", function (e) {
        console.log("e", e);
        $("#imageModal").css({
          display: "block",
        });
        let img = $(this).data("img");
        let mobileUrl =
          img.attr("mobileurl") !== undefined
            ? img.attr("mobileurl")
            : img.attr("src");
        let desktopUrl =
          img.attr("desktopurl") !== undefined
            ? img.attr("desktopurl")
            : img.attr("src");
        $(".modal-desktop-img").attr("src", desktopUrl);
        $(".modal-mobile-img").attr("src", mobileUrl);
        $(".modal-desktop-img").data("act-img", img);
        $(".modal-mobile-img").data("act-img", img);
      });
    });
  };

  show_input_values = (hidden_field_name, field_name) => {
    let hidden_field_val = $("." + hidden_field_name).val();
    $("." + field_name).val(hidden_field_val);
  };

  componentWillMount = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const page_id = urlParams.get("page_id");
    await this.setState({ pageId: page_id });
    this.fetchPage();
    this.fetchUTM();

  };

  componentDidMount = () => {

  }

  fetchPage() {
    axios
      .post(`http://magicpages.propstory.com/getPage`, {
        page_id: this.state.pageId,
      })
      .then((res) => {
        console.log("GET EDIT PAGE");
        console.log(res.data);

        var htmlen = res.data.page.html;
        const decoded = decodeURIComponent(escape(window.atob(htmlen)));
        this.setState({
          code: decoded,
          pageName: res.data.page.name,
          pageLinks: res.data.page.links[0]
        });
      });

    setTimeout(() => {
      $(document.getElementById("frame").contentWindow.document.body).prop(
        "contentEditable",
        "true"
      );
      // this.create_custom_input_fields();
      console.log("IN HANDLE FILE READ");
      this.enableEditableImages();
      this.setState({
        appended: (document.getElementById(
          "frame"
        ).innerHTML += document.getElementById("utm")),
      });
    }, 2000);

    $().ready(function () {
      $("#frame").ready(function () {
        //The function below executes once the iframe has finished loading
        let allImages = $("img").not(".modal-desktop-img, .modal-mobile-img");

        $.each(allImages, function (index, img) {
          $(img).hover(
            function () {
              $(this).append($(".middle-btn-container"));
              $(".middle-btn-container").css({
                opacity: "1",
              });
              $(img).css({
                opacity: ".7",
              });
              $(".change-img-btn").data("img", $(img));
            },
            function () {
              $(".middle-btn-container").css({
                opacity: "0",
              });
              $(img).css({
                opacity: "1",
              });
            }
          );

          $(".change-img-btn").on("click", function (e) {
            $("#imageModal").css({
              display: "block",
            });
            let img = $(this).data("img");
            let mobileUrl =
              img.attr("mobileurl") !== undefined
                ? img.attr("mobileurl")
                : img.attr("src");
            let desktopUrl =
              img.attr("desktopurl") !== undefined
                ? img.attr("desktopurl")
                : img.attr("src");
            $(".modal-desktop-img").attr("src", desktopUrl);
            $(".modal-mobile-img").attr("src", mobileUrl);
            $(".modal-desktop-img").data("act-img", img);
            $(".modal-mobile-img").data("act-img", img);
          });
        });
      });
    });
  }

  handleClose(event, reason) {

    if (reason === 'clickaway') {
      return;
    }

    this.setState({ isSaved: false });
  };

  // CHANGE FRAME VIEW FUNCTION
  onClickMobile() {
    this.setState({
      frameWidth: "30%",
      btnClassM: "secondary",
      btnClassD: "disabled",
    });
  }

  onClickDesktop() {
    this.setState({
      frameWidth: "100%",
      btnClassD: "secondary",
      btnClassM: "disabled",
    });
  }

  addImageChangeBtn = () => {
    var myFrame = document.getElementById("frame").getAttribute("srcDoc");
    console.log("myFrame", myFrame);
  };

  createLink = () => {
    var content = document.getElementsByTagName("iframe").frame.contentWindow.document.documentElement.innerHTML;
    var encoded = btoa(unescape(encodeURIComponent(content)));

    axios
      .post(`http://magicpages.propstory.com/createLink`, {
        page_name: this.state.pageName,
        page_id: this.state.pageId,
        page_html: encoded,
        page_link: this.state.pageLinks
      })
      .then(
        this.setState({ loadingLink: true }),
        setTimeout(() => {
          window.location.reload()
        }, 2000)

      )
    this.setState({ loadingLink: true });
  }

  // FETCH UTM DATA FUNCTION
  fetchUTM() {
    // Where we're fetching data from
    console.log(this.state.pageId);

    axios
      .post(`http://magicpages.propstory.com/getutmDetails`, {
        page_id: this.state.pageId,
      })
      // We get the API response and receive data in JSON format...
      .then((res) => {
        console.log("FETCHING UTM DATA");
        const utmData = res.data.utm;


        this.setState({
          utmId: utmData._id,
          meta_keyword: utmData.meta_keyword,
          meta_description: utmData.meta_description,
          meta_author: utmData.meta_author,
          page_title: utmData.page_title,
          google_pageview_pixel: utmData.google_pageview_pixel,
          facebook_pageview_pixel: utmData.facebook_pageview_pixel,
          other_pageview_pixel: utmData.other_pageview_pixel,
          google_conversion_pixel: utmData.google_conversion_pixel,
          facebook_conversion_pixel: utmData.facebook_conversion_pixel,
          other_conversion_pixel: utmData.other_conversion_pixel,
        });
      })

      // Catch any errors we hit and update the app
      .catch((error) =>
        this.setState({
          error,
          isLoading: false,
        })
      );
  }

  onSave = async () => {

    this.setState({ loadingLink: true })

    let flaginput = document
      .getElementsByTagName("iframe")
      .frame.contentWindow.document.documentElement.getElementsByClassName(
        "intl-tel-input"
      );


    let numOfPhone = flaginput.length;
    for (var i = 0; i < numOfPhone; i++) {
      flaginput[0].parentNode.removeChild(flaginput[0]);
    }

    var phoneInput = document.createElement("input");
    phoneInput.setAttribute("type", "tel");
    phoneInput.setAttribute("class", "form-control phone");

    var phoneInput1 = document.createElement("input");
    phoneInput1.setAttribute("type", "tel");
    phoneInput1.setAttribute("class", "form-control phone");

    var phoneInput2 = document.createElement("input");
    phoneInput2.setAttribute("type", "tel");
    phoneInput2.setAttribute("class", "form-control phone");

    let form1 = document
      .getElementsByTagName("iframe")
      .frame.contentWindow.document.documentElement.getElementsByClassName(
        "form1"
      );

    let form2 = document
      .getElementsByTagName("iframe")
      .frame.contentWindow.document.documentElement.getElementsByClassName(
        "form2"
      );

    let form3 = document
      .getElementsByTagName("iframe")
      .frame.contentWindow.document.documentElement.getElementsByClassName(
        "form3"
      );

    $(form1).find(".phone-open-div").append(phoneInput)
    if (form2) { $(form2).find(".phone-open-div").append(phoneInput1) }
    if (form3) { $(form3).find(".phone-open-div").append(phoneInput2) }

    var content = document.getElementsByTagName("iframe").frame.contentWindow
      .document.documentElement.innerHTML;
    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(content, "text/html");

    if (htmlDoc.head.querySelector("meta[name='author']")) {
      $(
        htmlDoc.head
          .querySelector("meta[name='author']")
          .setAttribute("content", this.state.meta_author)
      );
    }
    $(
      htmlDoc.head
        .querySelector("meta[name='description']")
        .setAttribute("content", this.state.meta_description)
    );
    $(
      htmlDoc.head
        .querySelector("meta[name='keywords']")
        .setAttribute("content", this.state.meta_keyword)
    );
    $(htmlDoc.head.getElementsByClassName("title_hidden_header")).html(
      this.state.page_title
    );

    var encoded = btoa(unescape(encodeURIComponent(content)));

    this.onSubmitForm();

    // console.log(changeTitle);
    await axios.post("http://magicpages.propstory.com/page/update", {
      name: this.state.pageName,
      html: encoded,
      user_id: localStorage.getItem("userId"),
      page_id: this.state.pageId,
    })
    this.fetchPage()
    this.setState({
      isSaved: true,
      loadingLink: false,
    });
  };

  // FILE UPLOAD FUNCTION
  fileReader = null;

  onChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
    console.log("FILE CONYTENT");

    this.fileReader = new FileReader();
    this.fileReader.onloadend = this.handleFileRead;

    this.fileReader.readAsText(event.target.files[0]);
  };

  handleChange(event) {
    this.setState({
      name_input: event.target.name_input,
    });
  }

  // IMAGE UPLOAD FUNCTION
  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    let formData = new FormData();
    let imageSrc = document
      .getElementById("frame")
      .contentWindow.document.body.getElementsByClassName("img101");

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    formData.append("templateName", "NAME");
    formData.append("file", file);
    axios
      .post(`http://magicpages.propstory.com/awsImageUpload`, formData, config)
      .then((res) => {
        console.log(res.data.data.path);

        this.setState({
          file: file,
          imagePreviewUrl: res.data.data.path,
        });

        $(imageSrc).attr("src", res.data.data.path);
        console.log($(imageSrc).attr("src"));
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(
      "FRAME BODY" +
      document.getElementById("frame").contentWindow.document.body.innerHTML
    );

    console.log(
      "CHAGED SRC" +
      this.state.clicked +
      "IAMGE URL" +
      this.state.imagePreviewUrl
    );
    reader.readAsDataURL(file);
  }

  // FORM SUBMIT FUNCTION
  onChangeForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmitForm = () => {
    // get our form data out of state
    const {
      meta_keyword,
      meta_description,
      page_title,
      meta_author,
      favicon_icon,
      google_pageview_pixel,
      facebook_pageview_pixel,
      other_pageview_pixel,
      google_conversion_pixel,
      facebook_conversion_pixel,
      other_conversion_pixel,
      pageId
    } = this.state;

    let utmApi = this.state.utmId ? "http://magicpages.propstory.com/utm/update" : "http://magicpages.propstory.com/utm";
    axios
      .post(utmApi, {
        meta_keyword,
        meta_description,
        page_title,
        meta_author,
        favicon_icon,
        google_pageview_pixel,
        facebook_pageview_pixel,
        other_pageview_pixel,
        google_conversion_pixel,
        facebook_conversion_pixel,
        other_conversion_pixel,
        page: pageId,
      })
      .then((result) => {
        console.log(result);
      });
  };

  onUpdatePage = (e) => {
    e.preventDefault();
    const { html, _id, name } = this.props.location.state;
    const userId = this.props.userInfo.id;
    this.props.UpdatePage({
      name,
      html,
      userId,
      _id,
    });
  };

  onChangeForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };



  render() {
    // console.log("USER", this.props.userInfo);
    // console.log("name", name);

    const uploadButton = {
      display: "none",
    };
    const labelColor = {
      color: "white",
    };

    const open = Boolean(this.state.anchorEl);
    const id = open ? 'link-popover' : undefined;

    // UPLOAD AND CHANGE IMAGE FUNCTION
    let { imagePreviewUrl } = this.state;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = <img width="100%" height="200" src={imagePreviewUrl} />;
    } else {
      imagePreview = (
        <img
          width="100%"
          height="200"
          src="https://lunawood.com/wp-content/uploads/2018/02/placeholder-image.png"
        />
      );
    }

    console.log("coming inside jquery");
    $(document).on("click", ".change-img-btn", function (e) {
      console.log("clicking on button");
      console.log($(this).parent().siblings().find("img"));
      console.log($(this).parent().siblings().find("img").prevObject[0].src);

      $("#imageModal").css({
        display: "block",
      });
      let img = $(this).data("img");
      let mobileUrl =
        img.attr("mobileurl") !== undefined
          ? img.attr("mobileurl")
          : img.attr("src");
      let desktopUrl =
        img.attr("desktopurl") !== undefined
          ? img.attr("desktopurl")
          : img.attr("src");
      $(".modal-desktop-img").attr("src", desktopUrl);
      $(".modal-mobile-img").attr("src", mobileUrl);
      $(".modal-desktop-img").data("act-img", img);
      $(".modal-mobile-img").data("act-img", img);
    });

    // if(document.getElementById("frame") != null){

    // }
    // else  {<UploadTemplateModal />}
    return (
      <>
        <Backdrop open={this.state.loadingLink} style={{ zIndex: 9 }} >
          <CircularProgress style={{ color: "#fff" }} />
          <h3 style={{ marginBottom: 0, color: "#fff", marginLeft: 10 }}>Saving your page.</h3>
        </Backdrop>

        <div className="content mb-5" style={{ padding: 20 }}>
          <Grid container alignItems="center" justify="space-between">
            <Grid item sm={3} md={3}>
              <h3
                style={{
                  fontWeight: "light",
                  fontFamily: "Montserrat",
                  color: "#000",
                  marginBottom: 0,
                }}
              >
                {this.state.pageName}
              </h3>
            </Grid>

            <Grid container justify="flex-end">
              {/* CHANGE DESKTOP AND MOBILE VIEW BUTTON */}
              <Tooltip title="Create Link" aria-label="create-link">

                <ToggleButton
                  aria-describedby={id}
                  onClick={this.handleClick}
                  style={{
                    backgroundColor: "#dfdfdf",
                    outline: "none",
                    border: "none",
                    margin: 5,
                  }}
                  value="Create Link"
                >
                  <LinkIcon color="action" />
                </ToggleButton>
              </Tooltip>
              <Popover
                id={id}
                open={open}
                anchorEl={this.state.anchorEl}
                onClose={this.handleClosePopover}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                {this.state.loadingLink ?
                  <div className="d-flex align-items-center m-3">
                    <p style={{ marginBottom: 0, fontWeight: "bold", fontSize: 12 }}>Creating Link. 🕖</p>
                  </div> :
                  <div style={{ padding: 10 }}>
                    {this.state.pageLinks && <div>
                      <div className="d-flex align-items-center justify-content-between mb-2 links">
                        <img src={google} width="16" />
                        <h5>{"https://propstory.com/" + this.state.pageLinks.google}</h5>
                        <a onClick={() => { navigator.clipboard.writeText("https://propstory.com/" + this.state.pageLinks.google) }}>
                          <FileCopyIcon fontSize="small" />
                        </a>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-2 links">
                        <img src={facebook} width="16" />
                        <h5>{"https://propstory.com/" + this.state.pageLinks.taboola}</h5>
                        <a onClick={() => { navigator.clipboard.writeText("https://propstory.com/" + this.state.pageLinks.taboola) }}>
                          <FileCopyIcon fontSize="small" />
                        </a>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-2 links">
                        <img src={taboola} width="16" />
                        <h5>{"https://propstory.com/" + this.state.pageLinks.fb}</h5>
                        <a onClick={() => { navigator.clipboard.writeText("https://propstory.com/" + this.state.pageLinks.fb) }}>
                          <FileCopyIcon fontSize="small" />
                        </a>
                      </div>
                    </div>}
                    {this.state.pageLinks == undefined ? <button onClick={this.createLink}
                      style={{ padding: "5px 10px", backgroundColor: "#654062", fontWeight: "500" }}>Create Links</button> :

                      <button onClick={this.createLink}
                        style={{ padding: "5px 10px", backgroundColor: "#654062", fontWeight: "500" }}> Update Links</button>}

                  </div>}
              </Popover>
              <ToggleButtonGroup value={this.state.format} aria-label="device">
                <Tooltip title="Desktop View" aria-label="desktop">
                  <ToggleButton
                    value="laptop"
                    aria-label="laptop"
                    onClick={this.onClickDesktop}
                    style={{
                      backgroundColor: "#dfdfdf",
                      outline: "none",
                      border: "none",
                      margin: 5,
                    }}
                  >
                    <LaptopIcon color={this.state.btnClassD} />
                  </ToggleButton>
                </Tooltip>
                <Tooltip title="Mobile View" aria-label="mobile">
                  <ToggleButton
                    value="phone"
                    aria-label="phone"
                    onClick={this.onClickMobile}
                    style={{
                      backgroundColor: "#dfdfdf",
                      outline: "none",
                      border: "none",
                      margin: 5,
                    }}
                  >
                    <PhoneAndroidIcon color={this.state.btnClassM} />
                  </ToggleButton>
                </Tooltip>
              </ToggleButtonGroup>
              <button
                type="submit"
                className="btn"
                onClick={this.onSave}
                style={{ margin: 5, backgroundColor: "#654062", fontWeight: "normal" }}
              >
                Save Page
            </button>
            </Grid>
          </Grid>

          <Grid container justify="space-between">
            <Grid item xs={10}>

              <iframe
                style={{
                  position: "relative",
                  left: "50%",
                  top: window.innerWidth < 1217 ? "45%" : "50%",
                  transform: "translate(-50%, -50%)",
                  borderRadius: 12,
                }}
                className="mt-4"
                width={this.state.frameWidth}
                height="100%"
                id="frame"
                srcDoc={this.state.code}
              />
            </Grid>
            {/* IFRAME ENDS HERE */}

            {/* FORM FOR UTM DETAILS */}
            <Grid item xs={2}>
              <div className="card ml-3 mt-4 p-3" style={{ borderRadius: 12 }}>
                <div className="card-block">
                  <div className="previewComponent">{imagePreview}</div>

                  <form encType="multipart/form-data">
                    <label style={labelColor} className="btn">
                      <input
                        name="image_file"
                        id="image_file"
                        style={uploadButton}
                        className="fileInput"
                        type="file"
                        accept="image"
                        onChange={(e) => this._handleImageChange(e)}
                      />
                    Choose & Upload
                  </label>
                  </form>
                </div>
              </div>
              <div className="card p-3 ml-3" style={{ borderRadius: 12 }}>
                <div className="card-block">
                  <form className="form" onSubmit={this.onSubmitForm}>
                    <fieldset>
                      <legend>PAGE DETAILS</legend>

                      <label className="k-form-field">
                        <span>Meta Keyword</span>
                      </label>
                      <br />
                      <input
                        onChange={this.onChangeForm}
                        name="meta_keyword"
                        value={this.state.meta_keyword}
                        className="k-textbox"
                        placeholder="Meta Keyword"
                      />
                      <br />
                      <label className="k-form-field">
                        <span>Meta Description</span>
                      </label>
                      <br />
                      <input
                        onChange={this.onChangeForm}
                        name="meta_description"
                        value={this.state.meta_description}
                        className="k-textbox"
                        placeholder="Meta Description"
                      />
                      <br />
                      <label className="k-form-field">
                        <span>Page Title</span>
                      </label>
                      <br />
                      <input
                        onChange={this.onChangeForm}
                        name="page_title"
                        value={this.state.page_title}
                        className="k-textbox"
                        placeholder="Page Title"
                      />
                      <br />
                      <label className="k-form-field">
                        <span>Meta Author</span>
                      </label>
                      <br />
                      <input
                        onChange={this.onChangeForm}
                        name="meta_author"
                        value={this.state.meta_author}
                        className="k-textbox"
                        placeholder="Meta Author"
                      />
                      <br />
                      <label className="k-form-field">
                        <span>Favicon Icon </span>
                      </label>
                      <br />
                      <input
                        onChange={this.onChangeForm}
                        name="favicon_icon"
                        value={this.state.favicon_icon}
                        className="k-textbox"
                        placeholder="Favicon Icon"
                      />
                      <br />
                      <label className="k-form-field">
                        <span>Google Pageview Pixel</span>
                      </label>
                      <br />
                      <input
                        onChange={this.onChangeForm}
                        name="google_pageview_pixel"
                        value={this.state.google_pageview_pixel}
                        className="k-textbox"
                        placeholder="Google Pageview Pixel"
                      />
                      <br />
                      <label className="k-form-field">
                        <span>Facebook Pageview Pixel</span>
                      </label>
                      <br />
                      <input
                        onChange={this.onChangeForm}
                        name="facebook_pageview_pixel"
                        value={this.state.facebook_pageview_pixel}
                        className="k-textbox"
                        placeholder="Facebook Pageview Pixel"
                      />
                      <br />
                      <label className="k-form-field">
                        <span>Other Pageview Pixel</span>
                      </label>
                      <br />
                      <input
                        onChange={this.onChangeForm}
                        name="other_pageview_pixel"
                        value={this.state.other_pageview_pixel}
                        className="k-textbox"
                        placeholder="Other Pageview Pixel"
                      />
                      <br />
                      <label className="k-form-field">
                        <span>Google Conversion Pixel</span>
                      </label>
                      <br />
                      <input
                        onChange={this.onChangeForm}
                        name="google_conversion_pixel"
                        value={this.state.google_conversion_pixel}
                        className="k-textbox"
                        placeholder="Google Conversion Pixel"
                      />
                      <br />
                      <label className="k-form-field">
                        <span>Facebook Conversion Pixel</span>
                      </label>
                      <br />
                      <input
                        onChange={this.onChangeForm}
                        name="facebook_conversion_pixel"
                        value={this.state.facebook_conversion_pixel}
                        className="k-textbox"
                        placeholder="Facebook Conversion Pixel"
                      />
                      <br />
                      <label className="k-form-field">
                        <span>Other Conversion Pixel</span>
                      </label>
                      <br />
                      <input
                        onChange={this.onChangeForm}
                        name="other_conversion_pixel"
                        value={this.state.other_conversion_pixel}
                        className="k-textbox"
                        placeholder="Other Conversion Pixel"
                      />
                      <br />
                      <label className="k-form-field">
                        <span>Page</span>
                      </label>
                      <br />
                      <input
                        onChange={this.onChangeForm}
                        name="pageName"
                        value={this.state.pageName}
                        className="k-textbox"
                        placeholder="Page Name"
                      />
                    </fieldset>
                    <br />
                  </form>
                </div>
              </div>
            </Grid>
          </Grid>
          {/* FORM EDS HERE */}
          {/* CHANGE IFRAME IMAGES OR ITS SIZE */}


          {/* <div style={{ display: "none" }} id="utm">
          {Object.entries(this.state.fetchedData).map(function ([key, value]) {
            return <div> {`${key}=\"${value}\"`}</div>;
          })}
        </div> */}
          <Snackbar open={this.state.isSaved} autoHideDuration={1000} onClose={this.handleClose}>
            <Alert onClose={this.handleClose} severity="success">
              Your Page is saved successfully.👌
        </Alert>
          </Snackbar>
        
        </div>
      </>

    );
  }
}

function mapStateToProps(states) {
  return { userInfo: states.AuthReducer.user };
}

function mapDispatchToProps(dispatch) {
  return {
    UpdatePage: (payload) => {
      dispatch(DataBaseMiddleware.UpdatePage(payload));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageDetail);
