import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Baheth App
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A modern Next.js 15 application with TypeScript, Tailwind CSS, and shadcn/ui components
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Next.js 15</CardTitle>
              <CardDescription>
                Built with the latest Next.js version featuring React 19 and improved performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enjoy the latest features including React Compiler support and enhanced developer experience.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>TypeScript</CardTitle>
              <CardDescription>
                Full TypeScript support for better development experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Type-safe development with excellent IntelliSense and error catching.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>shadcn/ui</CardTitle>
              <CardDescription>
                Beautiful and accessible UI components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pre-built components that you can copy and paste into your apps.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Demo Section */}
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>
              Try out the components below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex gap-2">
              <Button className="flex-1">
                Primary Button
              </Button>
              <Button variant="outline" className="flex-1">
                Secondary
              </Button>
            </div>
            <Button variant="ghost" className="w-full" asChild>
              <a href="/components">View All Components</a>
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500 dark:text-gray-400">
          <p>Edit <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">src/app/page.tsx</code> to get started</p>
        </div>
      </div>
    </div>
  );
}
