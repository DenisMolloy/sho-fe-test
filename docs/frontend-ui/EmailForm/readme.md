# EmailForm component

This component is designed to simplify the process of building a form that should send a email. For now it supports 2 providers: [EmailJS](https://www.emailjs.com/) and Klaviyo. Each one of them has it's own configuration data.

`EmailForm` component provides 3 callbacks for better control:

- `onBeforeSubmit` to be called before submit process is started
- `onSubmitSuccess` to be called after submit process has successfully finished
- `onSubmitFail` to be called if error happened during submission process

To configure a EmailForm component you should provide an object to `emailConfig` prop. The structure of this object is different depending on what type of form you want to use:

## Props

| Name            | Required | Type                                                 | Default value | Description                                                                     |
| --------------- | -------- | ---------------------------------------------------- | ------------- | ------------------------------------------------------------------------------- |
| emailConfig     | +        | EmailConfig                                          | -             | Configuration object                                                            |
| onBeforeSubmit  | -        | (event: React.FormEvent<HTMLFormElement>) => void    | -             | Handler called before submit process is started                                 |
| onSubmitSuccess | -        | (event: React.FormEvent<HTMLFormElement>) => void    | -             | Handler called after submit process successfully finished                       |
| onSubmitFail    | -        | (error: Error) => void                               | -             | Handler called when error happened during submission                            |
| validateForm    | -        | (event: React.FormEvent<HTMLFormElement>) => boolean | -             | Function to validate form inputs. Return true if form is valid, false otherwise |

## EmailJS

To use `EmailForm` with EmailJS you should provide an object with the following keys:

- type = "emailJS"
- serviceId = service ID from EmailJS
- templateId = template ID from EmailJS
- userId = user ID from EmailJS
- toEmail = email address to which email will be sent

### Usage

    <Form
      emailConfig={{
        type: "emailJS",
        userId: "email_js_user_id",
        toEmail: "your@email.com",
        templateId: "email_js_template_id",
        serviceId: "email_js_service_id"
      }}
      onBeforeSubmit={() => {}}
      onSubmitSuccess={() => {}}
      onSubmitFail={() => {}}
      validateForm={() => true}
    >
      <input name="first_name" placeholder="First Name" type="text" />
      <input name="last_name" placeholder="Last Name" type="text" />
      <button type="submit">Submit</button>
    </Form>

## Klaviyo Form

To use `EmailForm` with Klaviyo you should provide an object with the following keys:

- type = "klaviyo"
- subscriptionUrl = url to which a request would be made

### Usage

    <Form
      emailConfig={{
        type: "klaviyo",
        subscriptionUrl: "https://klaviyo-url"
      }}
      onBeforeSubmit={() => {}}
      onSubmitSuccess={() => {}}
      onSubmitFail={() => {}}
      validateForm={() => true}
    >
      <input
        name="email"
        placeholder="Email"
        type="email"
      />
      <input
        name="test"
        placeholder="Email"
        type="hidden"
      />
      <button type="submit">Submit</button>
    </Form>
