import express from "express";
import { 
    getTenants, 
    getTenantById,
    saveTenant,
    updateTenant,
    deleteTenant
} from "../controllers/tenant.js";
import { 
    getRooms, 
    getRoomById,
    saveRoom,
    updateRoom,
    deleteRoom,
    getRoomByRoomNo
} from "../controllers/room.js";
import { 
    getPayments, 
    getPaymentById,
    savePayment,
    updatePayment,
    deletePayment
} from "../controllers/payment.js";

import { 
    getMaintenances, 
    getMaintenanceById,
    saveMaintenance,
    updateMaintenance,
    deleteMaintenance
} from "../controllers/maintenance.js";
import { sendMail, getEmailAddresses, saveMessage, getMessage } from "../controllers/message.js";

const router = express.Router();

//router.post('/email', sendMail);
//router.get('/email', getEmailAddresses);
router.post('/email', saveMessage);
router.get('/email', getMessage);

router.get('/tenants', getTenants);
router.get('/tenants/:id', getTenantById);
router.post('/tenants', saveTenant);
router.patch('/tenants/:id', updateTenant);
router.delete('/tenants/:id', deleteTenant);

router.get('/rooms', getRooms);
router.get('/rooms/:id', getRoomById);
router.get('/rooms/:roomNo', getRoomByRoomNo);
router.post('/rooms', saveRoom);
router.patch('/rooms/:id', updateRoom);
router.delete('/rooms/:id', deleteRoom);

router.get('/payment', getPayments);
router.get('/payment/:id', getPaymentById);
router.post('/payment', savePayment);
router.patch('/payment/:id', updatePayment);
router.delete('/payment/:id', deletePayment);

router.get('/maintenances', getMaintenances);
router.get('/maintenances/:id', getMaintenanceById);
router.post('/maintenances', saveMaintenance);
router.patch('/maintenances/:id', updateMaintenance);
router.delete('/maintenances/:id', deleteMaintenance);

export default router;