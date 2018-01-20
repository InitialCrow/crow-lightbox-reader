'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./CrowLightBoxReader.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CrowLightBoxReader = function (_Component) {
  _inherits(CrowLightBoxReader, _Component);

  function CrowLightBoxReader(props) {
    _classCallCheck(this, CrowLightBoxReader);

    var _this = _possibleConstructorReturn(this, (CrowLightBoxReader.__proto__ || Object.getPrototypeOf(CrowLightBoxReader)).call(this, props));

    _this.poolItems = props.items || []; // this is all items audio image or video pool 
    _this.isRead = props.isRead || 0; // this is index of pool we  display in lightbox
    _this.closeCallBack = props.closeCallBack || false; //this is the close callBack we need to write to change state for render the lightbox

    // pass object settings to change lightbox configuration
    _this.settings = props.settings || {};
    _this.showPool = _this.settings.showPool || true; //show thumbnail of pool in lightbox
    _this.showBtn = _this.settings.showBtn || true; // show next and prev button
    _this.showCloseBtn = _this.settings.showCloseBtn || true; // show close button
    _this.showDesc = _this.settings.showDesc || true; // show text descripton on lightbox
    _this.showPagination = _this.settings.showPagination || true; // show pagination of pool on lightbox
    _this.nodeToHide = _this.settings.nodeToHide || false; // hide node content before show the lightbox
    _this.showLightBox = _this.settings.showLightBox || false; //show lightbox
    _this.debug = _this.settings.debug || false; // enable debug mode to show console msg

    //construct props
    _this.nodes = {
      main: null,
      thumb: [],
      desc: null,
      video: null,
      audio: null
    };
    _this.poolHideNode = [];
    _this.state = {
      changeItem: false
    };
    return _this;
  }

  _createClass(CrowLightBoxReader, [{
    key: 'console',
    value: function (_console) {
      function console() {
        return _console.apply(this, arguments);
      }

      console.toString = function () {
        return _console.toString();
      };

      return console;
    }(function () {
      var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

      if (this.debug !== false) {
        console.log(msg);
      }
    })
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {

      //show item selected by default
      if (this.showLightBox !== false) {
        document.body.classList.add('crow-lightbox-reader-bg');
        this.nodes.desc.style.maxWidth = this.poolItems[this.isRead].width + "px";
        this.nodes.thumb[this.isRead].classList.add('current');
      }
      if (this.nodeToHide !== false) {
        this.deleteBody();
      }
    }
  }, {
    key: 'deleteBody',
    value: function deleteBody() {
      // hide body and show lightbox
      if (this.nodeToHide !== false) {
        var node = document.getElementById(this.nodeToHide);
        node.classList.add('crow-hide');
        while (node.firstChild) {
          this.poolHideNode.push(node.firstChild);
          node.removeChild(node.firstChild);
        }
        node.prepend(this.nodes.main);
        node.classList.remove('crow-hide');
        if (this.nodes.video !== null) {
          this.nodes.video.play();
        }
        if (this.nodes.audio !== null) {
          this.nodes.audio.play();
        }
      }
    }
  }, {
    key: 'restoreBody',
    value: function restoreBody() {
      // restore body for hidebody
      if (this.nodeToHide !== false && this.poolHideNode.length > 0) {
        var node = document.getElementById(this.nodeToHide);
        node.classList.add('crow-hide');
        while (node.firstChild) {

          node.removeChild(node.firstChild);
        }

        this.poolHideNode.map(function (nodeC) {
          node.appendChild(nodeC);
        });

        node.classList.remove('crow-hide');
      }
    }
  }, {
    key: 'closeLightBox',
    value: function closeLightBox() {
      // go to close light box
      if (this.closeCallBack !== false && this.showLightBox !== false) {

        this.closeCallBack();
      }
      if (this.showLightBox !== false) {
        document.body.classList.remove('crow-lightbox-reader-bg');
        this.showLightBox = false;
        this.restoreBody();
        this.setState({ renderItem: false });
      }
    }
  }, {
    key: 'changeItem',
    value: function changeItem(index) {
      // change item on click of item pull 
      this.nodes.thumb[this.isRead].classList.remove('current');

      this.isRead = index;
      this.nodes.thumb[this.isRead].classList.add('current');

      this.setState({ renderItem: true });
    }
  }, {
    key: 'changeNextItem',
    value: function changeNextItem() {
      // go to next item on click of next button

      if (this.isRead < this.poolItems.length - 1) {
        this.nodes.thumb[this.isRead].classList.remove('current');
        this.isRead++;
        this.nodes.thumb[this.isRead].classList.add('current');
        this.setState({ renderItem: true });
      }
    }
  }, {
    key: 'changePrevItem',
    value: function changePrevItem() {
      // go to prev item on click of prev button
      if (this.isRead > 0) {
        this.nodes.thumb[this.isRead].classList.remove('current');
        this.isRead--;
        this.nodes.thumb[this.isRead].classList.add('current');
        this.setState({ renderItem: true });
      }
    }
  }, {
    key: 'renderPagination',
    value: function renderPagination() {
      // render pagination of pool
      if (this.showPagination !== false) {
        var current = this.isRead + 1;
        var pool = this.poolItems.length;

        return _react2.default.createElement(
          'p',
          { className: 'crow-lightbox-reader-pagination' },
          current,
          ' / ',
          pool
        );
      }
    }
  }, {
    key: 'renderDesc',
    value: function renderDesc() {
      var _this2 = this;

      var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      // render description
      if (this.showDesc !== false) {
        if (this.nodes.desc !== null) {
          this.nodes.desc.style.maxWidth = item.width + "px";
        }
        return _react2.default.createElement(
          'p',
          { ref: function ref(p) {
              _this2.nodes.desc = p;
            }, className: 'crow-lightbox-reader-desc' },
          item.desc
        );
      }
    }
  }, {
    key: 'renderCloseBtn',
    value: function renderCloseBtn() {
      var _this3 = this;

      // render close button
      if (this.showCloseBtn !== false) {
        return _react2.default.createElement(
          'span',
          { className: 'lightbox-close-btn', onClick: function onClick() {
              _this3.closeLightBox();
            } },
          '\u274C'
        );
      }
    }
  }, {
    key: 'renderBtn',
    value: function renderBtn() {
      var _this4 = this;

      // render next and prev button 
      if (this.showBtn !== false) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: 'crow-lightbox-reader-prev', onClick: function onClick() {
                _this4.changePrevItem();
              } },
            _react2.default.createElement(
              'p',
              { className: 'lightbox-btn' },
              '\u2770'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'crow-lightbox-reader-next', onClick: function onClick() {
                _this4.changeNextItem();
              } },
            _react2.default.createElement(
              'p',
              { className: 'lightbox-btn' },
              '\u276F'
            )
          )
        );
      }
    }
  }, {
    key: 'renderVideoItemThumb',
    value: function renderVideoItemThumb() {
      var _this5 = this;

      var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var i = arguments[1];
      // render video item for type "video"

      if (item.type === "video") {
        return _react2.default.createElement(
          'li',
          { onClick: function onClick() {
              _this5.changeItem(i);
            }, ref: function ref(li) {
              _this5.nodes.thumb.push(li);
            }, key: i.toString(), className: 'pool-item' },
          _react2.default.createElement('video', { src: item.src, width: item.thumbWidth, height: item.thumbHeight, onPlay: function onPlay(evt) {
              evt.preventDefault();
            } })
        );
      } else if (item.type == "" || item.type == undefined) {
        this.console("Bug on CrowLightBoxReader => renderVideoItemThumb func || you need to write type ('video', 'image', 'song') property in items pool ");
        return;
      }
    }
  }, {
    key: 'renderImageItemThumb',
    value: function renderImageItemThumb() {
      var _this6 = this;

      var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var i = arguments[1];
      // render image item for type "image"
      if (item.type === "image") {
        return _react2.default.createElement(
          'li',
          { onClick: function onClick() {
              _this6.changeItem(i);
            }, ref: function ref(li) {
              _this6.nodes.thumb.push(li);
            }, key: i.toString(), className: 'pool-item' },
          _react2.default.createElement('img', { src: item.src, width: item.thumbWidth, height: item.thumbHeight, alt: item.alt })
        );
      }
      if (item.type == "" || item.type == undefined) {
        this.console("Bug on CrowLightBoxReader => renderImageItemThumb func || you need to write type ('video', 'image', 'song') property in items pool ");
        return;
      }
    }
  }, {
    key: 'renderAudioItemThumb',
    value: function renderAudioItemThumb() {
      var _this7 = this;

      var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var i = arguments[1];
      // render audio item for type "audio"
      if (item.type === "audio") {
        return _react2.default.createElement(
          'li',
          { onClick: function onClick() {
              _this7.changeItem(i);
            }, ref: function ref(li) {
              _this7.nodes.thumb.push(li);
            }, key: i.toString(), className: 'pool-item' },
          _react2.default.createElement('img', { src: item.thumbSrc, width: item.thumbWidth, height: item.thumbHeight, alt: 'thumbnail of audio content' })
        );
      } else if (item.type == "" || item.type == undefined) {
        this.console("Bug on CrowLightBoxReader => renderAudioItemThumb func || you need to write type ('video', 'image', 'song') property in items pool ");
        return;
      }
    }
  }, {
    key: 'renderItem',
    value: function renderItem() {
      var _this8 = this;

      var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      //render main item

      if (item.type === "video") {
        return _react2.default.createElement(
          'div',
          { className: 'render-content' },
          this.renderDesc(item),
          this.renderBtn(),
          _react2.default.createElement('video', { ref: function ref(video) {
              _this8.nodes.video = video;
            }, width: item.width, height: item.height, src: item.src, autoPlay: true, controls: true }),
          this.renderPagination()
        );
      }
      if (item.type === "audio") {
        return _react2.default.createElement(
          'div',
          { className: 'render-content' },
          this.renderDesc(item),
          this.renderBtn(),
          _react2.default.createElement('img', { width: item.width, height: item.height, src: item.thumbSrc, alt: 'image of song reader' }),
          _react2.default.createElement('audio', { ref: function ref(audio) {
              _this8.nodes.audio = audio;
            }, className: 'audio', src: item.src, autoPlay: true, controls: true }),
          this.renderPagination()
        );
      }
      if (item.type === "image") {
        return _react2.default.createElement(
          'div',
          { className: 'render-content' },
          this.renderDesc(item),
          this.renderBtn(),
          _react2.default.createElement('img', { width: item.width, height: item.height, className: 'render-content', src: item.src, alt: item.alt }),
          this.renderPagination()
        );
      }
      if (item == "" || item.type == undefined) {
        this.console("Bug on CrowLightBoxReader => renderItemRender func || you need to write type ('video', 'image', 'song') property in items pool ");
        return;
      }
    }
  }, {
    key: 'renderItemRenderer',
    value: function renderItemRenderer() {
      // show item in main render item of lightbox

      return _react2.default.createElement(
        'div',
        { key: 'r0', className: 'crow-lightbox-reader-render' },
        this.renderItem(this.poolItems[this.isRead])
      );
    }
  }, {
    key: 'renderPoolItemsThumb',
    value: function renderPoolItemsThumb() {
      var _this9 = this;

      // render items
      if (this.poolItems != "") {
        var poolItems = [];
        this.poolItems.map(function (item, i) {
          if (_this9.renderVideoItemThumb(item, i) !== undefined) {

            poolItems.push(_this9.renderVideoItemThumb(item, i));
          }
          if (_this9.renderImageItemThumb(item, i) !== undefined) {

            poolItems.push(_this9.renderImageItemThumb(item, i));
          }
          if (_this9.renderAudioItemThumb(item, i) !== undefined) {

            poolItems.push(_this9.renderAudioItemThumb(item, i));
          }
        });
        return poolItems;
      } else {
        this.console("Bug on CrowLightBoxReader => renderPoolItemsThumb func || you need to pass not empty items into items props on lightbox");
        return;
      }
    }
  }, {
    key: 'renderPoolListThumb',
    value: function renderPoolListThumb() {
      // render pool list 
      if (this.showPool !== false) {
        return _react2.default.createElement(
          'ul',
          { key: 'r1', className: 'crow-lightbox-reader-pool-list' },
          this.renderPoolItemsThumb()
        );
      }
    }
  }, {
    key: 'showRenderer',
    value: function showRenderer() {
      var _this10 = this;

      // render all render
      if (this.showLightBox !== false) {

        var render = [];
        render.push(this.renderItemRenderer());
        render.push(this.renderPoolListThumb());
        return _react2.default.createElement(
          'div',
          { ref: function ref(div) {
              _this10.nodes.main = div;
            }, className: 'crow-lightbox-reader' },
          this.renderCloseBtn(),
          render
        );
      } else {
        return null;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.showRenderer()
      );
    }
  }]);

  return CrowLightBoxReader;
}(_react.Component);

exports.default = CrowLightBoxReader;
