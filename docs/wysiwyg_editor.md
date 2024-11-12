# ReactQuill WYSIWYG Editor Integration

This document provides an overview of how the ReactQuill WYSIWYG editor is used for content creation and preview functionality within the application.

## Overview

The `ReactQuill` component is a rich text editor that allows users to create and format content in a user-friendly interface. It supports features such as headings, bold, italic, underline, strikethrough, text color and background, links, and image embedding.

## Explanation

### Content Editor Section

- **Component**: `ReactQuill`
  - The `ReactQuill` component is used to create the rich text editor in the application.
  - **Theme**: The editor is styled using the `"snow"` theme, providing a clean and user-friendly interface.
  - **Toolbar Modules**: The toolbar is configured to include:
    - Header levels: `1`, `2`, and none (`false`).
    - Text formatting options: `bold`, `italic`, `underline`, and `strike`.
    - Color options: `text color` and `background color`.
    - Additional options: `link` and `image` insertion.
  - **Value Binding**: The editor's content is bound to the `post.content` state. This allows for the content to be updated and stored as the user types or formats the text.
  - **`onChange` Handler**: The `onChange` event updates the `post.content` state whenever the content is modified in the editor.

### Preview Section

- **Preview Display**: After the user inputs content in the editor, a preview section is displayed beneath the editor.
  - If content is available in `post.content`, it is rendered inside a styled `div` with the help of the `parse` function (likely used to convert the HTML string content into JSX).
  - If there is no content in `post.content`, a fallback message `No content to preview` is displayed.

### Styling

- Both the content editor and preview sections are styled using Tailwind CSS classes.
  - **Editor**: The editor is given a margin-top (`mt-2`), rounded corners (`rounded-lg`), and a shadow effect (`shadow-sm`).
  - **Preview**: The preview is styled with a light background (``), a border (`border-gray-300`), rounded corners (`rounded-lg`), padding (`p-3`), and a shadow effect (`shadow-sm`).

## Features

- **Text Formatting**: Supports headings, bold, italic, underline, and strikethrough text.
- **Color Options**: Allows text and background colors to be modified.
- **Link and Image Insertion**: Provides options to insert links and images into the content.
- **Content Preview**: Displays a preview of the content with real-time updates.

## Limitations

- **Image Upload**: Currently, images are handled as string inputs (URLs or data URIs) and require predefined images or static URLs, as there is no integration with image hosting services.
- **No Image Editing**: The editor does not currently support image editing (like cropping or resizing).
- **Content Persistence**: The content is stored within the component state and may need external persistence mechanisms (like a database) for saving long-term content.
