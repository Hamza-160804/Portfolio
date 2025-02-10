import React, { Suspense, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loader from './components/Loader';

const PerformanceWrapper = ({ children }) => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app load
    const loadingTimer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000);

    // Performance monitoring
    const performanceEntries = performance.getEntriesByType('resource');
    performanceEntries.forEach(entry => {
      if (entry.responseEnd - entry.startTime > 1000) {
        console.warn(`Slow resource: ${entry.name}`);
      }
    });

    return () => clearTimeout(loadingTimer);
  }, []);

  if (isInitialLoading) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      {/* Add any global error boundary or performance monitoring here */}
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </Suspense>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static propTypes = {
    children: PropTypes.node.isRequired
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to monitoring service
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please refresh the page.</h1>;
    }

    return this.props.children;
  }
}

PerformanceWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default PerformanceWrapper;