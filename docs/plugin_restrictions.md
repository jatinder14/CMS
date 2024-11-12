# Plugin Restrictions

This document outlines the current restrictions and limitations when working with plugins in the application, specifically related to image handling and storage.

## 1. Images as String Input

Currently, images are handled as string inputs. This means that rather than uploading an image directly from the user’s file system, the image is represented by a string value (likely a URL or data URL) within the plugin data. The string input is then used to display the image in the post details or other plugin-related components.

### Example:

- Image URLs or base64-encoded strings are passed as strings.
- The images are referenced via these string values in the plugin functionality.

This approach simplifies the plugin integration but also imposes certain limitations on the flexibility and dynamic handling of image data.

## 2. No External Image Storage Support

As the current system does not integrate with cloud storage services like Amazon S3 or Azure Storage Accounts, we are unable to store uploaded images in the cloud. Instead, we use predefined constant images that are linked within the post details page.

### Current Image Handling:

- The images used in the application are fixed and stored locally or within the application itself, as the plugin system doesn't support dynamic image uploads or cloud-based storage solutions.
- Users cannot upload new images, and any image displayed within the post details is one of the constant images defined in the system.

This limitation might change in the future if integration with cloud services is implemented, but for now, users must work within the constraints of the available predefined images.

## 3. No Image Update or Delete Functionality

Currently, there is no functionality available to update or delete images once they are set within the post details page. Once an image is selected or assigned to a post, it is static until the page or data is manually altered.

### Limitations:

- Users cannot update an image once it is assigned to a post.
- Users cannot delete images from the post details page.

These restrictions will be addressed in future updates, but as of now, the system only supports static image assignments without any update or delete operations.
