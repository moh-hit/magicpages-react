import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import $ from "jquery";
import Frame from "react-frame";
import LaptopIcon from "@material-ui/icons/Laptop";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import Grid from "@material-ui/core/Grid";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { DataBaseMiddleware } from "../../store/middlewares/index.js";
var HtmlToReactParser = require("html-to-react").Parser;

const base_lpa_path = "https://propstory.com/lpa/";

const axios = require("axios");

const isMobile = window.innerWidth <= 500;
class PageDetail extends Component {
  constructor(props) {
    super(props);

    // DIFFERENT STATE VARIABLES
    this.state = {
      data: [],
      selectedFile: null,
      code: null,
      encoded: null,
      pageName: "",
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
      page: "",
      // Form Data Ends
      fetchedData: [],
      clicked: "",
      imgClass: "",
      margTop: 0,
      isSaved: false,
      //   code: this.state.data.html
    };
    this.onClickMobile = this.onClickMobile.bind(this);
    this.onClickDesktop = this.onClickDesktop.bind(this);
    // this.handleFileRead = this.handleFileRead.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDownload = this.onDownload.bind(this);
    this.enableEditableImages = this.enableEditableImages.bind(this);
    this._handleImageChange = this._handleImageChange.bind(this);
    this.fetchPage = this.fetchPage.bind(this);
  }

  enableEditableImages = () => {
    console.log("IN ENABLE EDITABLE");
    // this.addEditImageModal();
    // this.addEditImageModalEvents();
    // this.addImageChangeBtn();
    let that = this;
    let iframe = document.getElementById("frame");
    let innerDoc = iframe.contentDocument || iframe.contentWindow.document;
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
        var attri = $(this).attr("src");
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

  create_custom_input_fields = () => {
    let self = this;
    let custom_fields = [
      {
        name: "google_conversion_pixel",
        label: " Google Conversion Pixel ID",
        type: "pixel",
      },
      {
        name: "taboola_conversion_pixel",
        label: "Taboola Conversion Pixel ID",
        type: "pixel",
      },
      {
        name: "ivr",
        label: "IVR Code",
        type: "calling",
      },
      {
        name: "mobile_calling",
        label: "Mobile Phone Number",
        type: "calling",
      },
      {
        name: "desktop_calling",
        label: "Desktop Phone Number",
        type: "calling",
      },
      {
        name: "webhook_fb",
        label: "Webhook For facebook",
        type: "webhook",
      },
      {
        name: "webhook_taboola",
        label: "Webhook for taboola",
        type: "webhook",
      },
      {
        name: "webhook_linkedin",
        label: "Webhook for linkedin",
        type: "webhook",
      },
      {
        name: "webhook_times",
        label: "Webhook for times",
        type: "webhook",
      },
      {
        name: "webhook_google",
        label: "Webhook for google",
        type: "webhook",
      },
      {
        name: "title",
        label: "Page Title",
        type: "title",
      },
      {
        name: "description",
        label: "Page description",
        type: "meta",
      },
      {
        name: "keywords",
        label: "Page keywords",
        type: "meta",
      },
      {
        name: "page_name",
        label: "Page name",
        type: "meta",
      },
      {
        name: "location",
        label: "Location",
        type: "location",
      },
    ];

    custom_fields.forEach(function (custom_field) {
      let hidden_custom_field = custom_field.name + "_hidden";
      let custom_field_div = custom_field.name + "_div";
      // let checking_custom_div = $('.development_div').find(custom_field_div).length;
      if ($(".development_div").find("." + custom_field_div).length == 0) {
        let label_html_field =
          '<div className="form-group ' +
          custom_field_div +
          '"><label className="add_section">' +
          custom_field.label +
          '</label><input type="text" className="form-control ' +
          custom_field.name +
          '" /> <input type="hidden" className="' +
          hidden_custom_field +
          '" /></div>';
        // if($('input').hasClass('form-control phone'))
        $(".development_div").prepend(label_html_field);
      }
      if (custom_field.type == "calling") {
      }
      self.show_input_values(hidden_custom_field, custom_field.name);
    });
  };

  componentWillMount = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const page_id = urlParams.get("page_id");
    await this.setState({ pageId: page_id });
    this.fetchPage();
    this.fetchUTM();
  };

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
        });
      });

    setTimeout(() => {
      $(document.getElementById("frame").contentWindow.document.body).prop(
        "contentEditable",
        "true"
      );
      this.create_custom_input_fields();
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

  // FETCH UTM DATA FUNCTION

  fetchUTM() {
    // Where we're fetching data from
    axios
      .get(`http://magicpages.propstory.com/getutmDetails`, {
        page_id: this.state.pageId,
      })
      // We get the API response and receive data in JSON format...
      .then((res) => {
        console.log("FETCHING DATA");
        const persons = res.data;
        console.log(persons);
        this.setState({
          fetchedData: persons.utm[0],
        });

        this.setState({
          meta_keyword: this.state.fetchedData.meta_keyword,
          meta_description: this.state.fetchedData.meta_description,
          meta_author: this.state.fetchedData.meta_author,
          page_title: this.state.fetchedData.page_title,
          google_pageview_pixel: this.state.fetchedData.google_pageview_pixel,
          facebook_pageview_pixel: this.state.fetchedData
            .facebook_pageview_pixel,
          other_pageview_pixel: this.state.fetchedData.other_pageview_pixel,
          google_conversion_pixel: this.state.fetchedData
            .google_conversion_pixel,
          facebook_conversion_pixel: this.state.fetchedData
            .facebook_conversion_pixel,
          other_conversion_pixel: this.state.fetchedData.other_conversion_pixel,
          page: this.state.fetchedData.page,
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
    // console.log('---------------')
    // console.log(typeof($('iframe')))
    // console.log($('iframe')[0].contentWindow.document.documentElement)
    // console.log('---------------')
    // let html = $('iframe')[0].contentWindow.document.documentElement;
    // console.log(typeof($(html)));
    // console.log($(html));
    // console.log($(html)[0].innerHTML);
    // let inHtml = $(html)[0].innerHTML
    // let phoneDiv = $(inHtml).find('.phone-open-div')
    // let phones = $(html).find('.phone')
    // console.log(inHtml);
    // $('.intl-tel-input').remove();
    // console.log($('.intl-tel-input').remove());
    // console.log($(newHtml).find('.phone-open-div').length);
    // let newHtml = $(inHtml).remove('.phone-open-div')
    // $(phoneDiv).remove()
    // console.log($(newHtml));
    // console.log($(newHtml).find('.phone-open-div').length);
    // console.log($(newHtml).remove());
    // console.log($(newHtml).length);
    // $(inHtml).find('.intl-tel-input').remove()

    const flaginput = document
      .getElementsByTagName("iframe")
      .frame.contentWindow.document.documentElement.getElementsByClassName(
        "intl-tel-input"
      );
    for (var i = 0; i < flaginput.length; i++) {
      await flaginput[i].parentNode.removeChild(flaginput[i]);
    }

    var phoneInput = document.createElement("input");
    phoneInput.setAttribute("type", "tel");
    phoneInput.setAttribute("class", "form-control phone");
    let addingFlagInput = document
      .getElementsByTagName("iframe")
      .frame.contentWindow.document.documentElement.getElementsByClassName(
        "phone-open-div"
      );

  //   let j= 0;
  //   while(j < addingFlagInput.length) {
  //  await addingFlagInput[j].appendChild(phoneInput);
  //     ++j;
  //   }
    // for (var i = 0; i < addingFlagInput.length; i++) {

    // }

   addingFlagInput[0].appendChild(phoneInput);
 

    // $("iframe").contentDocument.documentElement.getElementsByClassName("phone-open-div").append('<input type="tel" className="form-control phone" style="color: #000000;" autocomplete="off" placeholder="Mobile No. *">')
    var content = document.getElementsByTagName("iframe").frame.contentWindow
      .document.documentElement.innerHTML;
    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(content, "text/html");
    var con1 = $(htmlDoc).find("body");

    // if (htmlDoc.head.querySelector("meta[name='author']")) {
    //   $(
    //     htmlDoc.head
    //       .querySelector("meta[name='author']")
    //       .setAttribute("content", this.state.meta_author)
    //   );
    // }
    // $(
    //   htmlDoc.head
    //     .querySelector("meta[name='description']")
    //     .setAttribute("content", this.state.meta_description)
    // );
    // $(
    //   htmlDoc.head
    //     .querySelector("meta[name='keywords']")
    //     .setAttribute("content", this.state.meta_keyword)
    // );
    // $(htmlDoc.head.getElementsByClassName("title_hidden_header")).html(
    //   this.state.page_title
    // );

    // changeTitle = this.state.page_title;
    const { item } = this.props.location.state;
    var forServer = htmlDoc;
    console.log(forServer);

    var encoded = btoa(unescape(encodeURIComponent(content)));
    console.log(encoded);
    this.onSubmitForm();

    // console.log(changeTitle);
    await axios.post("http://magicpages.propstory.com/page/update", {
      name: this.state.pageName,
      html: encoded,
      user_id: localStorage.getItem("userId"),
      page_id: this.state.pageId,
    });

    this.setState({
      isSaved: true,
    });
  };

  onDownload() {
    alert("DOWNLOADED");
  }

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
      pageId,
    } = this.state;

    axios
      .post("http://magicpages.propstory.com/utm/update", {
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
        page_id: pageId,
      })
      .then((result) => {
        console.log("AFTER SUBMITTING");
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
      <div className="content" style={{ padding: 20 }}>
        <Grid container alignItems="center" justify="space-between">
          <Grid item sm={6} md={6}>
            <h3
              style={{
                fontWeight: "Bold",
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
            <button
              type="submit"
              className="btn"
              onClick={this.onSave}
              style={{ margin: 5, backgroundColor: "#654062" }}
            >
              Save
            </button>
            <ToggleButtonGroup value={this.state.format} aria-label="device">
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
            </ToggleButtonGroup>
          </Grid>
        </Grid>

        <Grid container justify="space-between">
          <Grid item xs={10}>
            {/* <Frame
            style={{
              position: "relative",
              left: "50%",
              top: window.innerWidth < 1217 ? "45%" : "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: 12,
            }}
            styleSheets={['https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css']}
            width={this.state.frameWidth}
            height="1050"
            id="frame"
            className="frame"
          >
            {reactElement}
          </Frame> */}
            <iframe
              style={{
                position: "relative",
                left: "50%",
                top: window.innerWidth < 1217 ? "45%" : "50%",
                transform: "translate(-50%, -50%)",
                borderRadius: 12,
              }}
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
                      name="page"
                      value={this.state.page}
                      className="k-textbox"
                      placeholder="Page"
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

        <Row className="col-12 d-flex justify-content-around">
          <button
            type="submit"
            className="btn btn-primary col-2"
            onClick={this.onSave}
          >
            Save{" "}
          </button>
          {this.state.isSaved && (
            <button
              type="submit"
              className="btn btn-info"
              onClick={this.onDownload}
            >
              <i className="fas fa-arrow-alt-circle-down fa-2x" />
            </button>
          )}
        </Row>
        <div style={{ display: "none" }} id="utm">
          {Object.entries(this.state.fetchedData).map(function ([key, value]) {
            return <div> {`${key}=\"${value}\"`}</div>;
          })}
        </div>
      </div>
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
