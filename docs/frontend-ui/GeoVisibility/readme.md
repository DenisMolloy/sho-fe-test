# useGeoVisibility hook

This hook allows you to control if you want to show some banner/modal/etc to site visitor based on his location.

## Configuration

`useGeoVisibility` hook allows you to configure the visibility with a configuration object. Supported configuration keys are:

| Name      | Required | Type     | Default value | Description                                                                                    |
| --------- | -------- | -------- | ------------- | ---------------------------------------------------------------------------------------------- |
| countries | true     | string[] | -             | Array of countries where your container will be visible. Supports shorthands like NL, CA, etc. |

## Return values

`useGeoVisibility` hook returns an object containing 2 keys: `isVisible` and `hideBanner`.

| Name       | Type       | Description                                             |
| ---------- | ---------- | ------------------------------------------------------- |
| isVisible  | boolean    | When true banner should be visible for specified config |
| hideBanner | () => void | Callback function to hide the banner                    |

### Usage

    const countries = ['Australia', 'China']
    const { isVisible, hideBanner } = useGeoVisibility({
      countries
    })
