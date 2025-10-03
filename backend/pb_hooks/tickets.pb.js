/// <reference path="../pb_data/types.d.ts" />

/**
 * Ticket hooks for business logic
 */

// Auto-set completed_at when status changes to 'completed'
onRecordBeforeUpdateRequest((e) => {
  const record = e.record;
  const newStatus = e.httpContext.request().body.status;

  // Set completed_at when status changes to completed
  if (newStatus === 'completed' && record.get('status') !== 'completed') {
    record.set('completed_at', new Date().toISOString());
  }

  // Clear completed_at if status changes from completed to something else
  if (newStatus !== 'completed' && record.get('status') === 'completed') {
    record.set('completed_at', null);
  }
}, "tickets");

// Validate callback_time is set for callback type tickets
onRecordBeforeCreateRequest((e) => {
  const record = e.record;
  const type = record.get('type');
  const callbackTime = record.get('callback_time');

  if (type === 'callback' && !callbackTime) {
    throw new BadRequestError('Callback time is required for callback tickets');
  }
}, "tickets");

onRecordBeforeUpdateRequest((e) => {
  const record = e.record;
  const type = e.httpContext.request().body.type || record.get('type');
  const callbackTime = e.httpContext.request().body.callback_time || record.get('callback_time');

  if (type === 'callback' && !callbackTime) {
    throw new BadRequestError('Callback time is required for callback tickets');
  }
}, "tickets");
