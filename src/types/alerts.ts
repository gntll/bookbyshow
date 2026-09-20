export interface PriceAlertSubscription {
  id: string;
  email: string;
  targetId: string;
  targetType: 'movie' | 'event';
  title: string;
  initialPrice: number;
  targetPrice: number;
  createdAt: string;
  status: 'active' | 'triggered' | 'cancelled';
  lastCheckedPrice?: number;
  triggeredAt?: string;
}

export interface PriceAlertSubscribeRequest {
  email: string;
  targetId: string;
  targetType: 'movie' | 'event';
  title: string;
  initialPrice: number;
  targetPrice: number;
}

export interface PriceAlertCheckResult {
  checkedCount: number;
  triggeredCount: number;
  activeCount: number;
  notifications: Array<{
    alertId: string;
    email: string;
    title: string;
    targetPrice: number;
    foundPrice: number;
    provider: string;
    status: 'dispatched' | 'logged';
  }>;
}
