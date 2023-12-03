import {render, screen} from '@testing-library/react';
import Container from './container';

describe('Component: Container', () => {
  it('should render correctly', () => {
    render(<Container>
      <div>test</div>
    </Container>);
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
