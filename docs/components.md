# `PostForm` Component

The `PostForm` component is a React functional component that handles the creation and editing of posts, including fields for the title, slug, content, and custom fields. It includes a rich text editor (ReactQuill), a preview of the content, and a form submission button.

## Props

- **`title?`** (`string`): The title of the post (optional).
- **`slug?`** (`string`): The URL slug for the post (optional).
- **`content?`** (`string`): The content of the post (optional).
- **`onSubmit?`** (`(postData: any) => void`): A callback function to handle form submission (optional).
- **`[key: string]: any`**: Allows additional dynamic fields for customization (optional).

## Component Flow

### State

- **`post`**: Stores the state of the post, including title, slug, content, and images.
- **`customFields`**: Stores custom fields that are dynamically loaded using a plugin manager.

### Hooks

1. **`useEffect`** (for updating post state):
   - Updates the `post` state when the `title`, `slug`, or `content` props change.
2. **`useEffect`** (for loading custom fields):
   - Uses the `pluginManager` to load custom fields based on the `post` state and updates the `customFields` state.

### Functions

- **`handleTitleChange`**:

  - Updates the title and generates a slug automatically based on the title input. The slug is sanitized to follow a consistent format.

- **`slugify`**:

  - Converts the title into a URL-friendly slug by:
    - Converting the string to lowercase.
    - Removing non-alphanumeric characters (except spaces and hyphens).
    - Replacing spaces with hyphens.
    - Removing extra hyphens.

- **`handleCustomFieldChange`**:
  - Handles updates to custom fields based on user input.

### JSX Structure

1. **Title Section**:

   - A text field to enter the title of the post.

2. **Slug Section**:

   - A text field to display and modify the generated slug.

3. **Content Editor and Preview**:

   - A rich text editor (ReactQuill) for entering the post content.
   - A live preview of the content is shown as the user types.

4. **Custom Fields**:

   - Dynamically rendered custom fields provided by the plugin manager.

5. **Submit Button**:
   - A button that triggers the `onSubmit` callback when clicked.

### Example Usage

```tsx
<PostForm
  title="Post Title"
  slug="post-title"
  content="This is the content of the post."
  onSubmit={(postData) => console.log('Post submitted:', postData)}
/>
```

## Dependencies

- **React**: For managing state and rendering the component.
- **ReactQuill**: A rich text editor for content input.
- **Material UI**: For the `TextField` and `Button` components.
- **html-react-parser**: For rendering the preview of HTML content.
- **pluginManager**: For dynamically loading custom fields.

## Notes

- The `slug` is automatically generated from the `title` but can be manually edited.
- The `ReactQuill` editor supports basic formatting options like bold, italic, underline, and strike-through.
- Custom fields are handled via the `pluginManager`, which allows for dynamic extension of the form.

---

### Styling

- The component uses Tailwind CSS for layout and styling:
  - `flex`, `gap-y-8`, `p-6`, `rounded-lg`, `shadow-md` for layout and design.
  - `text-lg`, `font-semibold`, `` for text styling.

---
