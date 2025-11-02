// @ts-ignore;
import React from 'react';

// @ts-ignore;
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// @ts-ignore;
import '@testing-library/jest-dom';
// @ts-ignore;
import { ChatInterface } from '@/components/consultation/ChatInterface';

// Mock toast
const mockToast = jest.fn();
jest.mock('@/components/ui', () => ({
  useToast: () => ({
    toast: mockToast
  })
}));
const defaultProps = {
  messages: [{
    id: '1',
    type: 'system',
    content: '欢迎消息',
    timestamp: '2024-01-01T00:00:00Z',
    sender: 'ai'
  }],
  inputMessage: '',
  setInputMessage: jest.fn(),
  onSendMessage: jest.fn(),
  isTyping: false,
  connectionStatus: 'connected',
  currentServiceType: 'ai',
  isOnline: true,
  queuePosition: 0,
  onToggleAI: jest.fn(),
  onEndConsultation: jest.fn(),
  onRateConsultation: jest.fn(),
  showDetails: false,
  setShowDetails: jest.fn()
};
describe('ChatInterface Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('renders chat messages correctly', () => {
    render(<ChatInterface {...defaultProps} />);
    expect(screen.getByText('欢迎消息')).toBeInTheDocument();
    expect(screen.getByText('AI客服 - 12:00:00 AM')).toBeInTheDocument();
  });
  it('renders input field and send button', () => {
    render(<ChatInterface {...defaultProps} />);
    const input = screen.getByPlaceholderText('请输入您的问题...');
    const sendButton = screen.getByRole('button');
    expect(input).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
  });
  it('calls onSendMessage when send button is clicked', () => {
    const mockSendMessage = jest.fn();
    const props = {
      ...defaultProps,
      inputMessage: '测试消息',
      onSendMessage: mockSendMessage
    };
    render(<ChatInterface {...props} />);
    const sendButton = screen.getByRole('button');
    fireEvent.click(sendButton);
    expect(mockSendMessage).toHaveBeenCalled();
  });
  it('calls onSendMessage when Enter key is pressed', () => {
    const mockSendMessage = jest.fn();
    const props = {
      ...defaultProps,
      inputMessage: '测试消息',
      onSendMessage: mockSendMessage
    };
    render(<ChatInterface {...props} />);
    const input = screen.getByPlaceholderText('请输入您的问题...');
    fireEvent.keyPress(input, {
      key: 'Enter',
      code: 'Enter'
    });
    expect(mockSendMessage).toHaveBeenCalled();
  });
  it('displays typing indicator when isTyping is true', () => {
    const props = {
      ...defaultProps,
      isTyping: true
    };
    render(<ChatInterface {...props} />);
    const typingIndicator = document.querySelector('.animate-bounce');
    expect(typingIndicator).toBeInTheDocument();
  });
  it('disables input when connection is not available', () => {
    const props = {
      ...defaultProps,
      connectionStatus: 'connecting',
      isOnline: false
    };
    render(<ChatInterface {...props} />);
    const input = screen.getByPlaceholderText('请输入您的问题...');
    expect(input).toBeDisabled();
  });
  it('calls onToggleAI when toggle button is clicked', () => {
    const mockToggleAI = jest.fn();
    const props = {
      ...defaultProps,
      onToggleAI: mockToggleAI
    };
    render(<ChatInterface {...props} />);
    const toggleButton = screen.getByText('切换客服');
    fireEvent.click(toggleButton);
    expect(mockToggleAI).toHaveBeenCalled();
  });
  it('calls onEndConsultation when end button is clicked', () => {
    const mockEndConsultation = jest.fn();
    const props = {
      ...defaultProps,
      onEndConsultation: mockEndConsultation
    };
    render(<ChatInterface {...props} />);
    const endButton = screen.getByText('结束咨询');
    fireEvent.click(endButton);
    expect(mockEndConsultation).toHaveBeenCalled();
  });
  it('calls onRateConsultation when rating stars are clicked', () => {
    const mockRateConsultation = jest.fn();
    const props = {
      ...defaultProps,
      onRateConsultation: mockRateConsultation
    };
    render(<ChatInterface {...props} />);
    const stars = screen.getAllByTestId('rating-star');
    fireEvent.click(stars[4]); // Click 5-star rating

    expect(mockRateConsultation).toHaveBeenCalledWith(5);
  });
  it('toggles service details when details button is clicked', () => {
    const mockSetShowDetails = jest.fn();
    const props = {
      ...defaultProps,
      setShowDetails: mockSetShowDetails
    };
    render(<ChatInterface {...props} />);
    const detailsButton = screen.getByText('服务详情');
    fireEvent.click(detailsButton);
    expect(mockSetShowDetails).toHaveBeenCalledWith(true);
  });
  it('displays queue position when queuePosition > 0', () => {
    const props = {
      ...defaultProps,
      queuePosition: 3
    };
    render(<ChatInterface {...props} />);
    expect(screen.getByText('排队位置: 3')).toBeInTheDocument();
  });
  it('displays offline status when isOnline is false', () => {
    const props = {
      ...defaultProps,
      isOnline: false
    };
    render(<ChatInterface {...props} />);
    const offlineIcon = document.querySelector('.text-red-500');
    expect(offlineIcon).toBeInTheDocument();
  });
  it('renders different message types correctly', () => {
    const props = {
      ...defaultProps,
      messages: [{
        id: '1',
        type: 'user',
        content: '用户消息',
        timestamp: '2024-01-01T00:00:00Z',
        sender: 'user'
      }, {
        id: '2',
        type: 'ai',
        content: 'AI回复',
        timestamp: '2024-01-01T00:01:00Z',
        sender: 'ai'
      }, {
        id: '3',
        type: 'system',
        content: '系统消息',
        timestamp: '2024-01-01T00:02:00Z',
        sender: 'system'
      }]
    };
    render(<ChatInterface {...props} />);
    expect(screen.getByText('用户消息')).toBeInTheDocument();
    expect(screen.getByText('AI回复')).toBeInTheDocument();
    expect(screen.getByText('系统消息')).toBeInTheDocument();
  });
  it('applies custom className', () => {
    render(<ChatInterface {...defaultProps} className="custom-chat" />);
    const chatContainer = screen.getByTestId('chat-interface');
    expect(chatContainer).toHaveClass('custom-chat');
  });
});