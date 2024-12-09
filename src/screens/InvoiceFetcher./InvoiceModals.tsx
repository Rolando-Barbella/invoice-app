import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TouchableOpacity } from 'react-native';

interface InvoiceModalsProps {
  menuVisible: boolean;
  showDeleteConfirm: boolean;
  menuPosition: { top: number; right: number };
  selectedInvoice: any;
  onCloseMenu: () => void;
  onMenuOption: (action: 'finalize' | 'delete') => void;
  onCloseDeleteConfirm: () => void;
  onConfirmDelete: () => void;
}

const InvoiceModals: React.FC<InvoiceModalsProps> = ({
  menuVisible,
  showDeleteConfirm,
  menuPosition,
  selectedInvoice,
  onCloseMenu,
  onMenuOption,
  onCloseDeleteConfirm,
  onConfirmDelete,
}) => {
  return (
    <>
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={onCloseMenu}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={onCloseMenu}
          testID="modalOverlay"
        >
          <View style={[
            styles.menuContainer,
            {
              top: menuPosition.top,
              right: menuPosition.right,
            }
          ]}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => onMenuOption('finalize')}
              disabled={selectedInvoice?.finalized}
            >
              <Text style={selectedInvoice?.finalized ? styles.disabledText : undefined}>
                Finalize
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => onMenuOption('delete')}
              disabled={selectedInvoice?.finalized}
            >
              <Text style={[
                styles.deleteText,
                selectedInvoice?.finalized && styles.disabledText
              ]}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      <Modal
        visible={showDeleteConfirm}
        transparent={true}
        animationType="fade"
        onRequestClose={onCloseDeleteConfirm}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmDialog}>
            <Text style={styles.confirmTitle}>Delete Invoice</Text>
            <Text style={styles.confirmMessage}>
              Are you sure you want to delete this invoice?
            </Text>
            <View style={styles.confirmButtons}>
              <TouchableOpacity 
                style={[styles.confirmButton, styles.cancelButton]}
                onPress={onCloseDeleteConfirm}
              >
                <Text style={styles.confirmButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.confirmButton, styles.deleteButton]}
                onPress={onConfirmDelete}
              >
                <Text style={[styles.confirmButtonText, styles.deleteButtonText]}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  menuContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 4,
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    padding: 12,
    borderRadius: 4,
  },
  deleteText: {
    color: 'red',
  },
  confirmDialog: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    alignSelf: 'center',
    marginTop: '50%',
  },
  confirmTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  confirmMessage: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  confirmButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  confirmButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  deleteButtonText: {
    color: 'white',
  },
  disabledText: {
    color: '#999',
  },
});

export default InvoiceModals; 