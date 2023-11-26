//
//  MyLearningAppApp.swift
//  MyLearningApp
//
//  Created on 2023/11/23.
//

import SwiftUI

@main
struct MyLearningAppApp: App {
    var body: some Scene {
        WindowGroup {
            NoteListView()
                .environmentObject(NoteListViewModel())
        }
    }
}
