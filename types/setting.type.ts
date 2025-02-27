// Settings model
interface Setting {
  PK: string; // SETTING#{settingId}
  SK: string; // METADATA
  settingId: string;
  name: string;
  value: any;
  category: string;
  description?: string;
  updatedAt: string; // ISO date
  updatedBy: string; // userId
}

// Audit log model
interface AuditLog {
  PK: string; // AUDIT#{timestamp}
  SK: string; // USER#{userId}
  timestamp: string; // ISO date
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  details: any;
  ipAddress?: string;
  GSI1PK?: string; // AUDIT#USER#{userId}
  GSI1SK?: string; // timestamp
  GSI2PK?: string; // AUDIT#RESOURCE#{resource}
  GSI2SK?: string; // timestamp
}