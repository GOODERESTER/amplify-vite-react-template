import { useEffect, useState } from "react";
//import React from 'react';
import { uploadData } from 'aws-amplify/storage';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';


export const DefaultStorageManagerExample = () => {
  return (
    <StorageManager
      acceptedFileTypes={['image/*']}
      path="public/"
      maxFileCount={1}
      isResumable
    />
  );
};

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]); 
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (event: any) => {
      setFile(event.target.files[0]);
  };

  const fetchTodos = async () => {
    const { data: items, errors } = await client.models.Todo.list();
    console.log(errors);
    setTodos(items);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

    
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  return (
    <div> 
      <Authenticator>
        
        {({ signOut, user }) => (
        <main>
          <h1>{user?.signInDetails?.loginId}'s todos</h1>
          <button onClick={createTodo}>+ new</button>
          <ul>
            {todos.map((todo) => (
              <li 
              onClick={() => deleteTodo(todo.id)}
              key={todo.id}>{todo.content}</li>
            ))}
          </ul>
          <div>
            🥳 App successfully hosted. Try creating a new todo.
            <br />
            <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
              Review next step of this tutorial.
            </a>
          </div>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
      </Authenticator>
      <div>
          <input type="file" onChange={handleChange} />
            <button
                onClick={() => {
                  try {
                    if (!file) {
                      throw new Error("No file selected");
                    }
                    uploadData({
                      path: `picture-submissions/${file.name}`,
                      data: file,
                    });
                  } catch (error) {
                    console.error(error);
                  }
                    
                }}
            >
                Upload
            </button>
        </div>
    </div>
  );
}

export default App;
