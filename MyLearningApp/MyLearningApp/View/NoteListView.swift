//
//  ContentView.swift
//  MyLearningApp
//
//  Created on 2023/11/23.
//

import SwiftUI

struct NoteListView: View {
    @EnvironmentObject var noteListVM: NoteListViewModel
    @State private var selectedNote: NoteViewModel?
    @State private var toNoteDeitalView: Bool = false
    @State private var isDeleting: Bool = false
    
    var body: some View {
        NavigationView {
            VStack{
                if let selectedNote = selectedNote {
                    NavigationLink(
                        destination: NoteDetailView(targetId: selectedNote.id, targetTitle: selectedNote.title, targetContent: selectedNote.content, note: $noteListVM.notes[noteListVM.notes.firstIndex(where: {$0.id == selectedNote.id}) ?? 0]
                        ),
                        isActive: $toNoteDeitalView
                    ) {
                        EmptyView()
                    }
                }
                List {
                    ForEach(noteListVM.notes) { note in
                        if (isDeleting) {
                            HStack{
                                if let selectedNote = selectedNote {
                                    if(selectedNote.id == note.id) {
                                        Image(systemName: "checkmark.square")
                                    } else {
                                        Image(systemName: "square")
                                    }
                                } else {
                                    Image(systemName: "square")
                                }
                                Text(note.title)
                                    .onTapGesture {
                                        self.selectedNote = note
                                    }
                            }
                        } else {
                            Text(note.title)
                                .onTapGesture {
                                    self.selectedNote = note
                                    self.toNoteDeitalView = true
                                }
                        }
                    }
                }
            }
            .navigationBarTitle(Text(""), displayMode: .inline)
            .navigationBarItems(trailing: HStack {
                Button(action: {
                    self.isDeleting.toggle()
                }, label: {
                    Image(systemName: "square.and.pencil")
                })
                if(isDeleting) {
                    Button(action: {
                        if let selectedNote = selectedNote {
                            noteListVM.deleteNote(id: selectedNote.id)
                        }
                    }, label: {
                        Image(systemName: "trash")
                    })
                } else {
                    Button(action: {
                        self.selectedNote = noteListVM.addNote(title: "New Title", content: "")
                        self.toNoteDeitalView = true
                    }, label: {
                        Image(systemName: "plus")
                    })
                }
            })
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        NoteListView()
            .environmentObject(NoteListViewModel())
    }
}
