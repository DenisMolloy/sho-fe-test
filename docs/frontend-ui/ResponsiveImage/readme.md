# Contents

- [ResponsiveImage component](#responsiveimage-component)
- [getResponsiveImageSrc helper](#getresponsiveimagesrc-helper)
- [ResponsiveBackgroundImage component](#responsivebackgroundimage-component)

# ResponsiveImage component

This component is designed to:

- Load appropriately sized images based on device screen width by providing [`srcSet` property](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset) for you.
- Automatically load appropriate [image format](https://uploadcare.com/docs/image_transformations/compression_performance/#operation-format) (e.g. webp when possible) and [quality](https://uploadcare.com/docs/image_transformations/compression_performance/#operation-quality)
- Polyfill [lazy loading](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading) support [when needed](https://caniuse.com/#feat=loading-lazy-attr)

This optimizations only work for images that are uploaded using Shogun Frontend to our cdn. For external images, there's no real benefit of using `ResponsiveImage` component unless you want to lazyload them.

## Configuration

`ResponsiveImage` component accepts all the props that `img` component accepts with this two modifications:

| Name      | Required | Type                                                | Default value | Description                                                                                                                                                                                                                                                                                                                                                                                                     |     |
| --------- | -------- | --------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| `loading` | -        | `"lazy"`, `"eager"` or `"lazy-polyfill"`            | `"lazy"`      | Prop `loading` defaults to `lazy`, which means that, by default images rendered using this component will be lazy loaded using browser native lazy loading. Lazy loading is not supported by every browser, if you have an image that's critical to be loaded lazily (e.g. huge image in footer) you can use `lazy-polyfill`. If you want your image to load _immediately_ on page load, use `loading="eager"`. |     |
| `srcSet`  | -        | string                                              | -             | prop is generated for you to adapt to different screen sizes. Though, if you pass your own `srcSet`, it will be used instead.                                                                                                                                                                                                                                                                                   |     |
| `quality` | -        | lightest / lighter / normal / better / best / smart | smart         | sets the quality of the image                                                                                                                                                                                                                                                                                                                                                                                   |     |
| `format`  | -        | jpeg / png / webp / auto                            | auto          | sets the format of the image                                                                                                                                                                                                                                                                                                                                                                                    |     |
| `crop`    | -        | string (example: `100x200`)                         | -             | crops the image using [`scale_crop` operation](https://uploadcare.com/docs/transformations/resize_crop/#operation-scale-crop)                                                                                                                                                                                                                                                                                   |     |

### Usage example

Let's say we have a product image on the page that takes about the half of the page width on bigger screens and most of the page width on smaller screens, [like shown in this demo](https://share.getcloudapp.com/ApuAQAPA). This is how we'd implement it:

```jsx
<ResponsiveImage
  className="ProductBox-featuredImage"
  src={variant.images[0]}
  alt={variant.name}
  sizes="(max-width: 767px) 80vw, 40vw"
  loading="eager"
  width="500"
  height="1500"
/>
```

Note that:

- Using the [sizes prop](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes) We're telling the browser that for smaller screens, this image takes about 80% of screen width, for bigger screens it's just 40%. This helps browser load appropriately sized image. Those values don't need to be exact.
- We're using `loading="eager"` to tell the browser to load this image right away and don't try to optimize by lazy loading it.
- We're using [`width`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-width) and [`height`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-height) which is always a good practice if possible.

Let's say on the bottom of the product page we have a full-width image that features some product detail:

```jsx
<ResponsiveImage
  className="ProductBox-featuredImage"
  width="1500"
  height="300"
  src={variant.images[0]}
  alt={variant.name}
/>
```

Note that:

- We're not providing `loading` prop, it will default to lazy and this image will be lazy loaded when and if the user scrolls down.
- We're not providing `sizes` prop, which means browser assumes it will be full width (`100vw`).
- We're providing [`width`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-width) and [`height`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-height) properties, it's _highly_ recommended to do this as it helps the browser properly allocate space for the image being lazy loaded and avoid jumps of content on the page.

# getResponsiveImageSrc helper

`getResponsiveImageSrc` can be used to manually manipulate image urls from our cdn.

## Usage examples

Resize image width and scale height proportionally

```js
getResponsiveImageSrc('https://ucarecdn.com/c5b7dd84-c0e2-48ff-babc-d23939f2c6b4/', {
  width: '1000',
})
// https://ucarecdn.com/c5b7dd84-c0e2-48ff-babc-d23939f2c6b4/-/resize/1000x/
```

Resize the image to exact dimensions

```js
getResponsiveImageSrc('https://ucarecdn.com/c5b7dd84-c0e2-48ff-babc-d23939f2c6b4/', {
  width: '1000',
  height: '500',
})
// https://ucarecdn.com/c5b7dd84-c0e2-48ff-babc-d23939f2c6b4/-/resize/1000x500/
```

# ResponsiveBackgroundImage component

This component is designed to help you use background images efficiently. It takes care of [`image-set` css function](https://developer.mozilla.org/en-US/docs/Web/CSS/image-set) for you

## Configuration

`ResponsiveBackgroundImage` component accepts all the props `div` (it renders div behind the scenes) accepts with addition of:

| Name      | Required | Type                                                | Default value | Description                                                                                                                                                                                                                               |     |
| --------- | -------- | --------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| `srcs`    | -        | `Record`                                            | -             | Accepts an object containing key-value pairs of valid media query and image urls. Any value supported by css `@media` expression is supported. You can use `default` as a key for top level background-image style (see an example below) |     |
| `src`     | -        | `string`                                            | -             | Accepts a single src string from which the default breakpoints will be automatically generated to load appropriately sized image based on screen size and resolution. Screen width will be assumed as image width (see an example below)  |     |
| `alt`     | -        | `string`                                            | -             | similar to `img` `alt` property                                                                                                                                                                                                           |     |
| `quality` | -        | lightest / lighter / normal / better / best / smart | smart         | sets the quality of the image                                                                                                                                                                                                             |     |
| `loading` | -        | `string`                                            | eager         | `eager` or `lazy` load image image                                                                                                                                                                                                        |     |
| `width`   | -        | `string`                                            | `number`      |                                                                                                                                                                                                                                           |     |  |
| `height`  | -        | `string`                                            | `number`      |                                                                                                                                                                                                                                           |     |  |

Note: either `src` or `srcs` prop needs to be provided. If both are provided, `srcs` takes precedence

## Examples

#### Example using `srcs`

```js
import { ResponsiveBackgroundImage } from 'frontend-ui'

export const ProductImage = ({ src }) => {
  return (
    <ResponsiveBackgroundImage
      srcs={{
        '(max-width: 768px)': getResponsiveImageSrc(src, { width: '800' }),
        '(min-width: 768px) and (max-width: 1024px)': getResponsiveImageSrc(src, {
          width: '1000',
        }),
        default: getResponsiveImageSrc(src, { width: '1200' }),
      }}
      alt="Our product"
      className="ProductImage-background"
      style={{ width: '600px', height: '300px', backgroundSize: '100%' }}
      loading="lazy"
    />
  )
}
```

Here we tell the component to render three different images for three different screen resolutions, which is going to be rendered as:

```css
// default
.my-img {
  background-image: url('...');
}

@media (max-width: 768px) {
  .my-img {
    background-image: url('...');
  }
}
@media (min-width: 768px) and (max-width: 1024px) {
  .my-img {
    background-image: url('...');
  }
}
```

#### Example using `src`

```js
import { ResponsiveBackgroundImage } from 'frontend-ui'

export const ProductImage = ({ src }) => {
  return (
    <ResponsiveBackgroundImage
      srcs={src}
      alt="Our product"
      className="ProductImage-background"
      style={{ width: '600px', height: '300px', backgroundSize: '100%' }}
    />
  )
}
```

CSS breakpoints will automatically be generated for this ranges and full screen width will be assumed as image width

- up to 480px
- 481px-768px
- 769px-1024px
- 1025px-1200px
- 1201px and up

```css
.my-component {
  background-image: url('...');
}

@media (max-width: 480px) {
  .my-component {
    background-image: url('...');
  }
}

@media (max-width: 480px) and (-webkit-min-device-pixel-ratio: 2) {
  .my-component {
    background-image: url('...');
  }
}
@media (min-width: 481px) and (max-width: 768px) {
  .my-component {
    background-image: url('...');
  }
}
@media (min-width: 481px) and (max-width: 768px) and (-webkit-min-device-pixel-ratio: 2) {
  .my-component {
    background-image: url('...');
  }
}
@media (min-width: 769px) and (max-width: 1024px) {
  .my-component {
    background-image: url('...');
  }
}
@media (min-width: 769px) and (max-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) {
  .my-component {
    background-image: url('...');
  }
}
@media (min-width: 1025px) and (max-width: 1200px) and (-webkit-min-device-pixel-ratio: 2) {
  .my-component {
    background-image: url('...');
  }
}
@media (min-width: 1201px) {
  .my-component {
    background-image: url('...');
  }
}
```
