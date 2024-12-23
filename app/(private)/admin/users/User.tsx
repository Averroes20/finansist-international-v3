'use client';
import ActionDelete from '@/components/common/ActionDelete';
import HeaderAdmin from '@/components/common/HeaderAdmin';
import SearchInput from '@/components/common/SearchInput';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useDebounce } from '@/hooks/use-debounce';
import { deleteUser, getUser, register, updateUser } from '@/lib/action/auth';
import { roles } from '@/lib/data/categories';
import { User } from '@/lib/type/user';
import { TypeEditUser, TypeRegister } from '@/lib/validation/schema-register';
import { PenBox } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';

const UserForm = dynamic(() => import('@/components/user/UserForm'));
const UserFormEdit = dynamic(() => import('@/components/user/UserFormEdit'));

const limit = 10;
const PageUser = () => {
  const [data, setData] = useState<User[]>([]);
  const [meta, setMeta] = useState({
    page: 1,
    totalPages: 1,
  });
  const [username, setUsername] = useState('');
  const queryUsername = useDebounce(username, 500);

  const fetchUser = useCallback(async () => {
    const {
      data,
      meta: { totalPages },
    } = await getUser({ username: queryUsername, page: meta.page, limit });
    setData(data);
    setMeta({ page: meta.page, totalPages: totalPages ?? 1 });
  }, [meta.page, queryUsername]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleAdd = useCallback(async (data: TypeRegister) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('role', data.role);
      formData.append('password', data.password);
      await register(formData);
    } catch (error) {
      alert(`Add User Failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, []);

  const handleEdit = useCallback(async (data: TypeEditUser) => {
    try {
      const { error } = await updateUser(data);
      if (error) {
        alert(error);
      }
    } catch (error) {
      alert(`Update User Failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    try {
      await deleteUser(id);
    } catch (error) {
      alert(`Delete User Failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, []);

  return (
    <>
      <HeaderAdmin title="User" description="Manage users" />
      <div className="flex flex-col md:flex-row gap-4 my-7">
        <SearchInput onChange={(e) => setUsername(e.target.value)} value={username} />
        <UserForm onSubmit={handleAdd} title="Add User" description="Add new user" trigger={<Button className="">Add User</Button>} />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="text-base">
              <TableHead className="w-[50px]">No.</TableHead>
              <TableHead className="min-w-[200px]">Fullname</TableHead>
              <TableHead className="min-w-[150px]">Email</TableHead>
              <TableHead className="min-w-[150px]">Role</TableHead>
            </TableRow>
          </TableHeader>
          {data.length > 0 ? (
            data.map((item, index) => (
              <TableBody key={item.id} className="text-base">
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{roles.find((role) => role.value === item.role)?.label}</TableCell>
                  <TableCell>
                    <div className="flex gap-3 self-center">
                      <UserFormEdit
                        onSubmit={handleEdit}
                        data={{
                          id: item.id,
                          name: item.name,
                          email: item.email,
                          role: item.role,
                        }}
                        title="Edit"
                        description="Edit user details"
                        trigger={<PenBox className="cursor-pointer" size={20} />}
                      />
                      <ActionDelete title="Delete" description="Are you sure you want to delete this review?" onClick={() => handleDelete(item.id)} />
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="text-center font-bold text-gray-500 text-md">
                  No blog found
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </div>
    </>
  );
};

export default PageUser;
