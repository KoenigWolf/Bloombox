import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/utils';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './card';

describe('Card', () => {
  it('should render card element', () => {
    render(<Card data-testid="card">Content</Card>);
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });

  it('should render children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('should apply base styles', () => {
    render(<Card data-testid="card">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('rounded-xl');
    expect(card).toHaveClass('border');
    expect(card).toHaveClass('bg-white');
  });

  it('should merge custom className', () => {
    render(
      <Card data-testid="card" className="custom-class">
        Content
      </Card>
    );
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('custom-class');
  });

  it('should forward ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Card ref={ref}>Content</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('CardHeader', () => {
  it('should render header element', () => {
    render(<CardHeader data-testid="header">Header</CardHeader>);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('should apply padding styles', () => {
    render(<CardHeader data-testid="header">Header</CardHeader>);
    const header = screen.getByTestId('header');
    expect(header).toHaveClass('p-6');
  });

  it('should merge custom className', () => {
    render(
      <CardHeader data-testid="header" className="custom">
        Header
      </CardHeader>
    );
    expect(screen.getByTestId('header')).toHaveClass('custom');
  });
});

describe('CardTitle', () => {
  it('should render as h3 element', () => {
    render(<CardTitle>Title</CardTitle>);
    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Title');
  });

  it('should apply typography styles', () => {
    render(<CardTitle>Title</CardTitle>);
    const title = screen.getByRole('heading');
    expect(title).toHaveClass('text-xl');
    expect(title).toHaveClass('font-medium');
    expect(title).toHaveClass('font-serif');
  });

  it('should merge custom className', () => {
    render(<CardTitle className="custom">Title</CardTitle>);
    const title = screen.getByRole('heading');
    expect(title).toHaveClass('custom');
  });
});

describe('CardDescription', () => {
  it('should render paragraph element', () => {
    render(<CardDescription>Description text</CardDescription>);
    expect(screen.getByText('Description text')).toBeInTheDocument();
  });

  it('should apply muted text styles', () => {
    render(
      <CardDescription data-testid="desc">Description</CardDescription>
    );
    const desc = screen.getByTestId('desc');
    expect(desc).toHaveClass('text-sm');
    expect(desc).toHaveClass('text-neutral-500');
  });

  it('should merge custom className', () => {
    render(
      <CardDescription data-testid="desc" className="custom">
        Description
      </CardDescription>
    );
    expect(screen.getByTestId('desc')).toHaveClass('custom');
  });
});

describe('CardContent', () => {
  it('should render content element', () => {
    render(<CardContent data-testid="content">Content</CardContent>);
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('should apply padding styles', () => {
    render(<CardContent data-testid="content">Content</CardContent>);
    const content = screen.getByTestId('content');
    expect(content).toHaveClass('p-6');
    expect(content).toHaveClass('pt-0');
  });

  it('should merge custom className', () => {
    render(
      <CardContent data-testid="content" className="custom">
        Content
      </CardContent>
    );
    expect(screen.getByTestId('content')).toHaveClass('custom');
  });
});

describe('CardFooter', () => {
  it('should render footer element', () => {
    render(<CardFooter data-testid="footer">Footer</CardFooter>);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('should apply flex and padding styles', () => {
    render(<CardFooter data-testid="footer">Footer</CardFooter>);
    const footer = screen.getByTestId('footer');
    expect(footer).toHaveClass('flex');
    expect(footer).toHaveClass('items-center');
    expect(footer).toHaveClass('p-6');
    expect(footer).toHaveClass('pt-0');
  });

  it('should merge custom className', () => {
    render(
      <CardFooter data-testid="footer" className="custom">
        Footer
      </CardFooter>
    );
    expect(screen.getByTestId('footer')).toHaveClass('custom');
  });
});

describe('Card composition', () => {
  it('should render complete card with all subcomponents', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Main content here</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByRole('heading', { name: 'Card Title' })).toBeInTheDocument();
    expect(screen.getByText('Card description')).toBeInTheDocument();
    expect(screen.getByText('Main content here')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });
});
