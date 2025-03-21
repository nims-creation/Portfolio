# Modern Portfolio Website

A clean, responsive portfolio website built with HTML, CSS, and JavaScript. Perfect for showcasing creative work and professional achievements.

## Features

- Modern, minimalist design
- Fully responsive (mobile, tablet, and desktop friendly)
- Dark/Light mode toggle
- Smooth scrolling and animations
- Interactive portfolio project grid with filtering
- Contact form
- Skill bars with animations
- Social media links

## Technologies Used

- HTML5
- CSS3 (with CSS Variables for theming)
- JavaScript (Vanilla, no jQuery)
- AOS (Animate On Scroll) library
- Font Awesome icons
- Google Fonts

## How to Use

1. Clone this repository or download the ZIP file.
2. Open the `index.html` file in your browser to view the website.
3. Customize the content by editing the HTML files.
4. Modify the styling by updating the CSS variables in the `:root` selector.
5. Customize the JavaScript functionality as needed.

## Customization

### Changing Colors

To change the color scheme, edit the CSS variables in the `:root` selector in `css/styles.css`:

```css
:root {
    --primary-color: #2a9d8f;
    --secondary-color: #e76f51;
    /* other variables */
}
```

### Adding Portfolio Projects

To add a new portfolio project, add the following HTML code inside the `.portfolio-grid` div:

```html
<div class="portfolio-item" data-category="category-name">
    <div class="portfolio-image">
        <img src="img/portfolio/your-image.jpg" alt="Project Name">
        <div class="overlay">
            <div class="overlay-content">
                <h3>Project Name</h3>
                <p>Category</p>
                <a href="#" class="btn view-project">View Project</a>
            </div>
        </div>
    </div>
</div>
```

### Adding Skills

To add a new skill in the About section, add the following HTML code inside the `.skill-bars` div:

```html
<div class="skill">
    <span>Skill Name</span>
    <div class="skill-bar">
        <div class="skill-level" style="width: 85%;"></div>
    </div>
</div>
```

## Images

The website uses placeholder images. Replace them with your own images in the following folders:
- Profile picture: `img/profile.jpg`
- Portfolio projects: `img/portfolio/project1.jpg`, `img/portfolio/project2.jpg`, etc.

## Browser Support

This website is compatible with all modern browsers including:
- Google Chrome
- Mozilla Firefox
- Safari
- Microsoft Edge

## Credits

- Fonts: [Google Fonts](https://fonts.google.com/)
- Icons: [Font Awesome](https://fontawesome.com/)
- Animation: [AOS Library](https://michalsnik.github.io/aos/)

## License

This project is licensed under the MIT License - see the LICENSE file for details. 