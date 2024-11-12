export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 sm:p-10  font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 w-full">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-1">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-semibold">
              CMS with WYSIWYG Editor and Plugin Architecture on Next.js By jatinder
            </h1>
          </div>
        </header>

        {/* Introduction Section */}
        <section className="w-full mb-2">
          <h2 className="text-xl font-semibold mb-4">
            An Innovative CMS for Effortless Content Management
          </h2>
          <p className="text-lg mb-6">
            Developed a content management system (CMS) using Next.js. This CMS should allow users to create, edit, and delete posts and pages through a user-friendly interface. The CMS should also feature an intuitive, WYSIWYG (What You See Is What You Get) editor that enables users to format content visually. Furthermore, a plugin architecture should be integrated to facilitate extensibility, allowing users to enhance functionality over time by adding custom components or features.
          </p>

          <h3 className="text-lg font-semibold  mb-2">
            Key Features:
          </h3>
          <ul className="list-inside list-disc  space-y-2">
            <li>
              Similar to modern website builders.
            </li>
            <li>
              Easy-to-use interface for creating, updating, and deleting content
            </li>
            <li>
              Easy-to-use interface for creating, updating, and deleting content
            </li>
            <li>Real-time preview of content changes</li>
            <li>
              Image slider integration for showcasing your content visually
            </li>
            <li>Seamless plugin management for extending functionality</li>
          </ul>
        </section>

        {/* Plugin Management */}
        <section className="w-full mb-10">
          <h2 className="text-xl font-semibold  mb-4">
            Plugin Management
          </h2>
          <p className="text-lg  mb-6">
            Our CMS includes a powerful plugin management system. Easily enable
            or disable plugins like the image slider, allowing you to customize
            the functionality of your website without any hassle.
          </p>
        </section>
      </main>
    </div>
  );
}
