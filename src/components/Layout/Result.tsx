'use client'
import { Result } from 'antd';

interface ResultCardProps {
    status:'success' | 'info' | 'warning' | 'error';
    title: string;
    message: string;
    extra?: React.ReactNode;
}
export default function ResultCard({status, title, message, extra}: ResultCardProps) {
  return (
  <Result
    status={status}
    title={title}
    subTitle={message}
    extra={extra}
  />
);
}

