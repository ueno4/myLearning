//
//  NoteDetailView.swift
//  MyLearningApp
//
//  Created on 2023/11/25.
//

import SwiftUI

struct NoteDetailView: View {
    let targetId: UUID
    @State var targetTitle: String
    @State var targetContent: String
    @Binding var note: NoteViewModel
    @State private var isEditing: Bool = false
    
    var body: some View {
        VStack {
            if(isEditing) {
                TextField(targetTitle, text: $targetTitle)
                    .frame(maxWidth: .infinity, maxHeight: 20, alignment: .topLeading)
                    .font(.title)
                    .padding()
                TextEditor(text: $targetContent)
                    .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
                    .padding()
            } else {
                Text(targetTitle)
                    .frame(maxWidth: .infinity, maxHeight: 20, alignment: .topLeading)
                    .padding()
                    .onTapGesture {
                        self.isEditing.toggle()
                        print("isEditing : \(isEditing)")
                    }
                    .font(.title)
                Text(targetContent)
                    .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
                    .padding()
                    .onTapGesture {
                        self.isEditing.toggle()
                        print("isEditing : \(isEditing)")
                    }
            }
        }.navigationBarItems(trailing: isEditing ? Button(action: {
            print(targetId.description)
            note.title = targetTitle
            note.content = targetContent
            self.isEditing.toggle()
            print("isEditing : \(isEditing), targetContent : \(targetContent)")
        }, label: {
            Image(systemName: "checkmark")
        }) : nil
        )
    }
}

