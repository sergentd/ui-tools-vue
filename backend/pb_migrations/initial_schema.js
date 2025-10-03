/// <reference path="../pb_data/types.d.ts" />

/**
 * Initial schema migration for UI Tools Atelier
 * Creates collections for ticketing system
 */
migrate((db) => {
  // Create tickets collection
  const tickets = new Collection({
    name: "tickets",
    type: "base",
    schema: [
      {
        name: "user_id",
        type: "relation",
        required: true,
        options: {
          collectionId: "_pb_users_auth_",
          cascadeDelete: false,
          minSelect: null,
          maxSelect: 1,
          displayFields: ["email"]
        }
      },
      {
        name: "title",
        type: "text",
        required: true,
        options: {
          min: 1,
          max: 255
        }
      },
      {
        name: "description",
        type: "text",
        required: false,
        options: {
          min: null,
          max: null
        }
      },
      {
        name: "customer",
        type: "text",
        required: false,
        options: {
          min: null,
          max: 255
        }
      },
      {
        name: "priority",
        type: "select",
        required: true,
        options: {
          maxSelect: 1,
          values: ["low", "medium", "high", "urgent"]
        }
      },
      {
        name: "status",
        type: "select",
        required: true,
        options: {
          maxSelect: 1,
          values: ["todo", "in-progress", "waiting", "completed"]
        }
      },
      {
        name: "type",
        type: "select",
        required: true,
        options: {
          maxSelect: 1,
          values: ["callback", "task"]
        }
      },
      {
        name: "due_date",
        type: "date",
        required: false,
        options: {
          min: "",
          max: ""
        }
      },
      {
        name: "callback_time",
        type: "date",
        required: false,
        options: {
          min: "",
          max: ""
        }
      },
      {
        name: "completed_at",
        type: "date",
        required: false,
        options: {
          min: "",
          max: ""
        }
      }
    ],
    indexes: [
      "CREATE INDEX idx_tickets_user_id ON tickets (user_id)",
      "CREATE INDEX idx_tickets_status ON tickets (status)",
      "CREATE INDEX idx_tickets_priority ON tickets (priority)",
      "CREATE INDEX idx_tickets_customer ON tickets (customer)",
      "CREATE INDEX idx_tickets_due_date ON tickets (due_date)"
    ],
    listRule: "@request.auth.id != '' && user_id = @request.auth.id",
    viewRule: "@request.auth.id != '' && user_id = @request.auth.id",
    createRule: "@request.auth.id != ''",
    updateRule: "@request.auth.id != '' && user_id = @request.auth.id",
    deleteRule: "@request.auth.id != '' && user_id = @request.auth.id"
  });

  return Dao(db).saveCollection(tickets);
}, (db) => {
  // Rollback - delete tickets collection
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("tickets");
  return dao.deleteCollection(collection);
});