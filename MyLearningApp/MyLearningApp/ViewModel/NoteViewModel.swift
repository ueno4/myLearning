//
//  NoteViewModel.swift
//  MyLearningApp
//
//  Created on 2023/11/23.
//

import Foundation

class NoteListViewModel: ObservableObject {
    @Published var notes: [NoteViewModel] = [NoteViewModel]()

    func getNote(id: UUID) -> NoteViewModel? {
        if let note = notes.first(where: {$0.id == id}) {
            return note
        }
        return nil
    }
    
    func addNote(title: String, content: String) -> NoteViewModel {
        let newNote = NoteViewModel(note: Note(title: title, content: content))
        notes.append(newNote)
        return newNote
    }
    
    func updateNote(id: UUID, newTitle: String, newContent: String) {
        if var note = notes.first(where: {$0.id == id}) {
            print("before: \(note.title) \(note.content)")
            note.title = newTitle.isEmpty ? note.title : newTitle
            note.content = newContent.isEmpty ? note.content : newContent
            print("after: \(note.title) \(note.content)")
        } else {
            print("Note with ID \(id) not fount")
        }
    }
    
    func deleteNote(id: UUID) {
        if let targetIndex = notes.firstIndex(where: {$0.id == id}) {
            notes.remove(at: targetIndex)
        } else {
            print("Note with ID \(id) not fount")
        }
    }
}

struct NoteViewModel: Identifiable {
    let id: UUID = UUID()
    var note: Note
    
    var title: String {
        get {
            self.note.title
        }
        set{
            self.note.title = newValue
        }
    }
    var content: String {
        get {
            self.note.content
        }
        set{
            self.note.content = newValue
        }
    }
}
