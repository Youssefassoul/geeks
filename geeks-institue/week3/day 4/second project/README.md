# 🥁 Mini Project - Drumset

A interactive drumset built with HTML, CSS, and JavaScript that responds to both keyboard presses and mouse clicks.

## 🎯 What You'll Learn

- **DOM Events** - Handling keyboard and mouse interactions
- **DOM Tree** - Manipulating HTML elements with JavaScript
- **HTML Audio** - Playing sound files in the browser
- **Event Listeners** - Responding to user interactions

## 🚀 Features

- **9 Drum Pads** - Each with unique sounds (Boom, Clap, HiHat, Kick, OpenHat, Ride, Snare, Tink, Tom)
- **Keyboard Controls** - Press A, S, D, F, G, H, J, K, L keys to play sounds
- **Mouse/Touch Support** - Click or tap drum pads to play sounds
- **Visual Feedback** - Drum pads light up and animate when activated
- **Responsive Design** - Works on desktop, tablet, and mobile devices

## 🎵 How to Use

1. **Keyboard**: Press any of the keys A, S, D, F, G, H, J, K, L
2. **Mouse**: Click on any drum pad
3. **Touch**: Tap drum pads on mobile devices

## 📁 Project Structure

```
drumset/
├── drumset.html      # Main HTML file
├── drumset.css       # Styling and animations
├── drumset.js        # JavaScript functionality
├── sounds/           # Audio files directory
│   ├── boom.wav
│   ├── clap.wav
│   ├── hihat.wav
│   ├── kick.wav
│   ├── openhat.wav
│   ├── ride.wav
│   ├── snare.wav
│   ├── tink.wav
│   └── tom.wav
└── README.md         # This file
```

## 🔧 Setup Instructions

1. **Download Audio Files**: You'll need to add the audio files to the `sounds/` directory. You can find free drum sounds online or use the ones from the [original repository](https://github.com/devtlv/drumset_setup).

2. **Open the Project**: Simply open `drumset.html` in your web browser.

3. **Start Playing**: Press keys or click drum pads to make music!

## 💡 Key Learning Points

### DOM Events

- `keydown` event for keyboard input
- `click` event for mouse clicks
- `touchstart` event for mobile touch

### HTML Audio

- Using `<audio>` elements with `data-key` attributes
- `audio.play()` method to play sounds
- `audio.currentTime = 0` to reset audio

### Event Handling

- `event.key` to get the pressed key
- `this.getAttribute()` to get element attributes
- `document.querySelector()` to find elements

## 🎨 Customization Ideas

- Add more drum sounds
- Change the color scheme
- Add volume controls
- Implement recording functionality
- Add different drum kits

## 🐛 Troubleshooting

- **No Sound**: Make sure audio files are in the `sounds/` directory
- **Keys Not Working**: Check browser console for errors
- **Mobile Issues**: Ensure touch events are properly handled

## 📚 Resources

- [MDN Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [W3Schools HTML Audio](https://www.w3schools.com/html/html5_audio.asp)
- [JavaScript Event Listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

---

**Happy Drumming!** 🥁🎵
